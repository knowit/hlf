from OpenSSL import crypto
from os import makedirs
from os.path import dirname, isdir, join, realpath


def create_pkey():
    pkey = crypto.PKey()
    pkey.generate_key(crypto.TYPE_RSA, 4096)
    return pkey


def create_certificate_request(pkey, data):
    # digest *should* be of type 'bytes' but only works with 'string'
    # (e.g. should be `b'sha256'` but accepts `'sha256'`)
    digest = 'sha256'
    request = crypto.X509Req()
    subject = request.get_subject()

    for key, value in data.items():
        setattr(subject, key, value)

    request.set_pubkey(pkey)
    request.sign(pkey, digest)
    return request


def main():
    root_folder = dirname(dirname(realpath(__file__)))
    temp_folder = join(root_folder, 'tmp')
    domain_data = {
        'C': 'NO',              # Country
        'ST': 'Oslo',           # State / province
        'O': 'HLF',             # Organization
        'CN': 'Lydpatruljen'    # Common name
    }
    domain_key = create_pkey()
    certificate_request = create_certificate_request(domain_key, domain_data)

    if not isdir(temp_folder):
        makedirs(temp_folder)

    # Dump domain private key to file
    with open(join(temp_folder, 'lydpatruljen.pem'), 'wb') as domain_key_file:
        domain_key_file.write(crypto.dump_privatekey(crypto.FILETYPE_PEM, domain_key))

    # Dump domain public key to file
    with open(join(temp_folder, 'lydpatruljen.pub'), 'wb') as domain_pub_file:
        domain_pub_file.write(crypto.dump_publickey(crypto.FILETYPE_PEM, domain_key))

    # Dump certificate request to file
    with open(join(temp_folder, 'lydpatruljen.csr'), 'wb') as csr_file:
        csr_file.write(crypto.dump_certificate_request(crypto.FILETYPE_PEM, certificate_request))


if __name__ == '__main__':
    main()
