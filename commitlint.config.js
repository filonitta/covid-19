module.exports = {
    extends: ['@commitlint/config-conventional'],
    rules: {
        'body-leading-blank': [1, 'always'],
        'footer-leading-blank': [1, 'always'],
        'header-max-length': [2, 'always', 500],
        'scope-case': [2, 'always', 'camel-case'],
        'subject-case': [
            2,
            'never',
            ['sentence-case', 'start-case', 'pascal-case', 'upper-case']
        ],
        'subject-empty': [2, 'never'],
        'subject-full-stop': [2, 'never', '.'],
        'type-case': [2, 'always', 'lower-case'],
        'type-empty': [2, 'never'],
        'type-enum': [
            2,
            'always',
            [
                'feat',     // Feature
                'fix',      // Bugfix
                'impr',     // Improvement
                'docs',     // Documentation
                'chore',    // Build, config...
                'tests',    // Unit tests
                'refactor'  // Refactoring
            ]
        ]
    }
};