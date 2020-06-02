
import sys
from datetime import datetime
from subprocess import check_call
from os import getcwd, chdir
from os.path import join
from shutil import rmtree, copytree
from tempfile import mkdtemp
from contextlib import contextmanager


REPO = 'git@github.com:kuk/lab.alexkuk.ru.git'


@contextmanager
def tmpdir():
    try:
        path = mkdtemp()
        yield path
    finally:
        rmtree(path)


@contextmanager
def cwd(path):
    old_path = getcwd()
    try:
        chdir(path)
        yield
    finally:
        chdir(old_path)


def log(format, *args):
    message = format % args
    now = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
    print(
        '[%s] %s' % (now, message),
        file=sys.stderr
    )


def run(command):
    log("Run %r", command)
    check_call(command)


def main():
    with tmpdir() as root:
        path = join(root, 'html')
        log('Copy to %r', path)
        copytree('.', path)
        with cwd(path):
            run(['touch', '.nojekyll'])
            run(['git', 'init'])
            run(['git', 'add', '.'])
            run(['git', 'commit', '-m', 'up'])
            run(['git', 'push', '--force', REPO, 'master:gh-pages'])


if __name__ == '__main__':
    main()
