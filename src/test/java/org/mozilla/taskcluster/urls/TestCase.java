package org.mozilla.taskcluster.urls;

import lombok.Data;

@Data
public class TestCase {
    private String     type;
    private String     expectedUrl;
    private String     oldExpectedUrl;
    private String[][] argSets;
}
