import os
import re

import yaml

import taskcluster_urls as t


SPEC_FILE = os.path.join(os.path.dirname(__file__), '..', 'specification.yml')
OLD_ROOT_URL = 'https://taskcluster.net'
ROOT_URL = 'https://taskcluster.example.com'


def pytest_generate_tests(metafunc):
    with open(SPEC_FILE) as f:
        specs = yaml.load(f)['specs']
        metafunc.parametrize(
            ['func', 'args', 'expected_url', 'old_expected_url'],
            [(getattr(t, re.sub('([A-Z]+)', r'_\1', s['type']).lower()),
                a, s['expectedUrl'], s['oldExpectedUrl'])
                for s in specs
                for a in s['argSets']
             ]
        )


def test_basic(func, args, expected_url, old_expected_url):
    assert func(ROOT_URL + '/', *args) == expected_url
    assert func(ROOT_URL, *args) == expected_url
    assert func(OLD_ROOT_URL + '/', *args) == old_expected_url
    assert func(OLD_ROOT_URL, *args) == old_expected_url
