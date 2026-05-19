export default [
    {
        // Глобальне ігнорування системних папок та звітів
        ignores: [
            "coverage/**", 
            "dist/**", 
            "node_modules/**"
        ]
    },
    {
        // Твої правила для перевірки JS-файлів
        rules: {
            "no-unused-vars": "warn",
            "no-console": "off"
        }
    }
];