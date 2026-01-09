import os
import yaml
import taskcluster_urls as tcurls


SPEC_FILE = os.path.join(os.path.dirname(__file__), '..', 'tests.yml')


def pytest_generate_tests(metafunc):
    with open(SPEC_FILE) as testsFile:
        spec = yaml.safe_load(testsFile)
        root_urls = spec['rootURLs']['new']
        expected_url = root_urls[0]
        metafunc.parametrize(
            ['expected_url', 'root_url'],
            [
                (expected_url, root_url)
                for root_url in root_urls
            ]
        )


def test_normalize(expected_url, root_url):
    assert tcurls.normalize_root_url(root_url) == expected_url
