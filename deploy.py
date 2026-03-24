import os, subprocess, re, time

site_name = f"damian-hill-portfolio-{int(time.time())}"
print(f"Creating site: {site_name}...")
create = subprocess.run(
    ["netlify", "sites:create", "--name", site_name],
    input="\n", capture_output=True, text=True, shell=True,
    encoding="utf-8", errors="replace", timeout=90
)

clean = re.sub(r'\x1b\[[0-9;]*[a-zA-Z]', '', create.stdout)
site_id_match = re.search(r'(?:Project|Site) ID:\s*([a-f0-9-]+)', clean)

if site_id_match:
    site_id = site_id_match.group(1)
    print(f"Created site: {site_name}.netlify.app (ID: {site_id})")
    print("Deploying...")
    result = subprocess.run(
        ["netlify", "deploy", "--prod", "--build", "--site", site_id],
        capture_output=True, text=True, shell=True,
        encoding="utf-8", errors="replace"
    )
    print(result.stdout)
    if result.stderr:
        print("STDERR:\n", result.stderr)
else:
    print("Failed to parse site ID. Cleaned output:\n", clean)
