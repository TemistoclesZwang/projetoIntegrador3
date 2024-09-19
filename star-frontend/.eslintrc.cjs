
module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh', '@typescript-eslint', 'unused-imports'],
  rules: {
    // React-specific rule to ensure export only components
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],

    // Regras para remover imports e variáveis não utilizadas
    'unused-imports/no-unused-imports': 'error',  // Remove imports não utilizados
    'unused-imports/no-unused-vars': [
      'error',  // Altere para "error" para que o ESLint remova automaticamente as variáveis não usadas
      { 
        vars: 'all',  // Remove todas as variáveis não usadas
        varsIgnorePattern: '^_',  // Ignora variáveis iniciadas com "_"
        args: 'after-used',  // Permite argumentos que são usados
        argsIgnorePattern: '^_'  // Ignora argumentos que começam com "_"
      },
    ],

    // Desativa as regras padrão de variáveis não utilizadas
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': 'off',

    // Evita o uso de `any` sem uma tipagem explícita
    '@typescript-eslint/no-explicit-any': 'error',

    // Regras para garantir dependências corretas no useEffect
    'react-hooks/exhaustive-deps': 'warn',  // Garante que todas as dependências estão no useEffect

    // Configurações opcionais de estilo para garantir boas práticas de código
    '@typescript-eslint/explicit-function-return-type': 'off',  // Opcional: Desativa a exigência de tipos de retorno explícitos para funções
    '@typescript-eslint/explicit-module-boundary-types': 'off',  // Opcional: Desativa a exigência de tipos explícitos nas interfaces públicas de módulos
  },
}