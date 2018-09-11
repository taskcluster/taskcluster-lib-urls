package org.mozilla.taskcluster.urls;

import java.io.InputStream;
import java.io.IOException;

import org.junit.Assert;
import org.junit.Test;

import org.yaml.snakeyaml.constructor.Constructor;
import org.yaml.snakeyaml.Yaml;

public class URLsTest {

    private final static String[] oldRootURLs = new String[] { "https://taskcluster.net", "https://taskcluster.net/" };

    private final static String[] newRootURLs = new String[] { "https://taskcluster.example.com",
            "https://taskcluster.example.com/" };

    /**
     * greenTick is an ANSI byte sequence to render a light green tick in a
     * color console.
     */
    private final static byte[]   greenTick   = new byte[] { 0x1b, 0x5b, 0x33, 0x32, 0x6d, (byte) 0xe2, (byte) 0x9c,
            (byte) 0x93, 0x1b, 0x5b, 0x30, 0x6d };

    /**
     * testURLs iterates through the language-agnostic test cases defined in
     * /specification.yml to ensure that the java implementation returns
     * consistent results with the other language implementations.
     */
    @Test
    public void testURLs() throws Exception {
        Yaml yaml = new Yaml(new Constructor(TestCases.class));
        InputStream inputStream = this.getClass().getClassLoader().getResourceAsStream("specification.yml");
        TestCases testCases = yaml.load(inputStream);
        for (TestCase testCase : testCases.getSpecs()) {
            for (String[] argSet : testCase.getArgSets()) {
                String methodName = testCase.getType();

                String oldExpectedUrl = testCase.getOldExpectedUrl();
                for (String rootURL : oldRootURLs) {
                    this.test(oldExpectedUrl, rootURL, methodName, argSet);
                }

                String newExpectedUrl = testCase.getExpectedUrl();
                for (String rootURL : newRootURLs) {
                    this.test(newExpectedUrl, rootURL, methodName, argSet);
                }
            }
        }
    }

    private static void test(String expectedUrl, String rootURL, String methodName, String[] argSet)
            throws NoSuchMethodException, IOException {
        Assert.assertEquals(expectedUrl, testFunc(methodName, URLs.provider(rootURL), argSet));
        System.out.write(greenTick);
        System.out.println(" " + methodName + "(" + quotedList(rootURL, argSet) + ") = " + expectedUrl);
    }

    public static String testFunc(String functionType, URLProvider urlProvider, String[] args)
            throws NoSuchMethodException {
        switch (functionType) {
        case "api":
            return urlProvider.api(args[0], args[1], args[2]);
        case "apiReference":
            return urlProvider.apiReference(args[0], args[1]);
        case "docs":
            return urlProvider.docs(args[0]);
        case "exchangeReference":
            return urlProvider.exchangeReference(args[0], args[1]);
        case "schema":
            return urlProvider.schema(args[0], args[1]);
        case "ui":
            return urlProvider.ui(args[0]);
        case "servicesManifest":
            return urlProvider.servicesManifest();
        default:
            throw new NoSuchMethodException("Unknown function type: " + functionType);
        }
    }

    private static String quotedList(String rootURL, String[] argSet) {
        String list = "'" + rootURL + "'";
        for (String arg : argSet) {
            list = list + ", '" + arg + "'";
        }
        return list;
    }
}
