import subprocess
import os

repo_path = r'X:\ECHO_PRIME\GS343-DIVINE-OVERSEER'
os.chdir(repo_path)

print("=== GS343-DIVINE-OVERSEER GITHUB SYNC ===\n")

# Check status
print("Checking git status...")
result = subprocess.run(['git', 'status'], capture_output=True, text=True)
print(result.stdout)

# Check if already synced
result = subprocess.run(['git', 'log', '--oneline', '-3'], capture_output=True, text=True)
print("Recent commits:")
print(result.stdout)

# Check remote status
print("\nChecking remote status...")
result = subprocess.run(['git', 'fetch', 'origin'], capture_output=True, text=True)
result = subprocess.run(['git', 'status', '-sb'], capture_output=True, text=True)
print(result.stdout)

# If behind or ahead, sync
result = subprocess.run(['git', 'rev-list', '--count', 'HEAD..origin/main'], capture_output=True, text=True)
behind = int(result.stdout.strip() or 0)

result = subprocess.run(['git', 'rev-list', '--count', 'origin/main..HEAD'], capture_output=True, text=True)
ahead = int(result.stdout.strip() or 0)

print(f"\nStatus: {ahead} commits ahead, {behind} commits behind")

if ahead > 0:
    print("\nPushing to origin/main...")
    result = subprocess.run(['git', 'push', 'origin', 'main'], capture_output=True, text=True)
    print(result.stdout)
    if result.returncode != 0:
        print(f"Error: {result.stderr}")
    else:
        print("✓ Successfully pushed!")

elif behind > 0:
    print("\nLocal is behind remote. Pulling...")
    result = subprocess.run(['git', 'pull', 'origin', 'main'], capture_output=True, text=True)
    print(result.stdout)
else:
    print("\n✓ Already synced with origin/main")

print("\n=== SYNC COMPLETE ===")
