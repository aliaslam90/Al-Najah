from pathlib import Path
from zipfile import ZipFile,ZIP_DEFLATED
from PIL import Image
import shutil
import json, tempfile
root=Path(__file__).resolve().parent.parent; stage=Path(tempfile.mkdtemp(prefix='al-najah-hosting-'))
if stage.exists(): shutil.rmtree(stage)
stage.mkdir()
# Production ZIP inventories the assets used by the deployed app; exclude old design/source assets.
allowed=set(json.loads((root/'tools/hosting-assets.json').read_text()))
allowed.update(p.relative_to(root/'public').as_posix() for p in (root/'public/assets').rglob('updated-*.webp'))
for p in (root/'dist').rglob('*'):
 if not p.is_file():continue
 rel=p.relative_to(root/'dist');name=rel.as_posix()
 if name.startswith('assets/') and name not in allowed and not rel.name.startswith('src-'):continue
 target=stage/rel;target.parent.mkdir(parents=True,exist_ok=True);shutil.copy2(p,target)
replacements={}
for p in (stage/'assets').rglob('*'):
 if p.suffix.lower() not in ['.png','.jpg','.jpeg'] or p.parent.name=='icons' or p.name.startswith('partner-'):continue
 im=Image.open(p);im.thumbnail((1920,1920),Image.Resampling.LANCZOS)
 dest=p.with_suffix('.webp');im.save(dest,'WEBP',quality=86,method=6)
 replacements[p.name]=dest.name;p.unlink()
for p in stage.rglob('*'):
 if p.suffix not in ['.js','.css','.html','.json','.webmanifest']:continue
 text=p.read_text()
 for old,new in replacements.items():text=text.replace(old,new)
 p.write_text(text)
output=root/'al-najah-updated-hosting.zip'
with ZipFile(output,'w',ZIP_DEFLATED) as z:
 for p in sorted(stage.rglob('*')):
  if p.is_file():z.write(p,p.relative_to(stage))
with ZipFile(output) as z:
 assert z.testzip() is None
 assert '.htaccess' in z.namelist() and 'api/send-email.php' in z.namelist()
print(f'{output.name}: {output.stat().st_size/1024/1024:.1f} MB; {len(list(stage.rglob("*")))} entries; {len(replacements)} optimized photo filenames.')
