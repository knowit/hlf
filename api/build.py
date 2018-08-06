import subprocess
import os
import base64
import json

textfile = open("./gc_auth.txt", 'r')

access_token = "Bearer " + textfile.read()
filepath = "https://www.googleapis.com/storage/v1/b/eu.artifacts.godlydpatruljen.appspot.com/o/secrets.encrypted.txt?alt=media"
decrypt_path = "https://cloudkms.googleapis.com/v1/projects/godlydpatruljen/locations/global/keyRings/storage/cryptoKeys/mainKey:decrypt"

downloadCommand = "curl -X GET -H \"Authorization: "+access_token+"\" "+filepath+""

res = bytes.decode(subprocess.check_output(downloadCommand))

enc = ""
for c in res:
    if c != '\n' and c != '\'' and c != '\r':
        enc += c

decryptCommand = "curl -s -X POST \""+decrypt_path+"\" -d \"{\"\"ciphertext\"\":\"\""+enc+"\"\"}\" -H \"Authorization:"+access_token+"\" -H \"Content-Type:application/json\""

res = bytes.decode(subprocess.check_output(decryptCommand))

dec = ""
count = 0
for c in res:
    if c == '\"':
        count += 1
    elif count == 3:
        dec += c

secrets = json.loads(bytes.decode(base64.b64decode(dec)))

buildCommand = "docker build ./"

if len(secrets) > 0:
    for secret in secrets:
        buildCommand += " --build-arg " + str.upper(secret) + "=" + secrets[secret]



buildCommand += " -t=\"lydpatruljen/godlyd\" --no-cache"
installCommand = "mvn install dockerfile:build -Dmaven.test.skip=true"
runCommand = "docker run -p 8080:8080 --rm lydpatruljen/godlyd"

os.system(installCommand+" && "+buildCommand+" && "+runCommand)
