import { propertyGroups } from 'stylelint-config-clean-order'

export default {
    customSyntax: 'postcss',
    extends: [
        'stylelint-config-recommended',
        'stylelint-config-clean-order',
        'stylelint-config-tailwindcss',
    ],
    ignoreFiles: ['**/*.{js,ts,tsx}'],
    plugins: ['stylelint-prettier'],
    rules: {
        'at-rule-no-deprecated': null,
        'no-descending-specificity': null,
        'order/properties-order': [
            propertyGroups.map(properties => ({
                emptyLineBefore: 'never',
                noEmptyLineBetween: true,
                properties,
            })),
            {
                severity: 'error',
                unspecified: 'bottomAlphabetical',
            },
        ],
        'prettier/prettier': [true, { singleQuote: false }],
    },
}
