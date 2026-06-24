"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initDatabase = initDatabase;
exports.query = query;
exports.isUsingSqlite = isUsingSqlite;
const promise_1 = __importDefault(require("mysql2/promise"));
const sqlite3_1 = __importDefault(require("sqlite3"));
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
let mysqlPool = null;
let sqliteDb = null;
let isSqlite = false;
async function initDatabase() {
    const useMySQL = process.env.USE_MYSQL === 'true';
    if (useMySQL) {
        try {
            console.log('Attempting to connect to MySQL database...');
            mysqlPool = promise_1.default.createPool({
                host: process.env.DB_HOST || 'localhost',
                user: process.env.DB_USER || 'root',
                password: process.env.DB_PASSWORD || '',
                database: process.env.DB_NAME || 'code_review_db',
                port: parseInt(process.env.DB_PORT || '3306'),
                waitForConnections: true,
                connectionLimit: 10,
                queueLimit: 0,
            });
            // Test the connection
            const connection = await mysqlPool.getConnection();
            console.log('Successfully connected to MySQL database.');
            connection.release();
            isSqlite = false;
            return;
        }
        catch (err) {
            console.error('Failed to connect to MySQL database. Error:', err.message);
            console.log('Falling back to SQLite database...');
        }
    }
    else {
        console.log('USE_MYSQL is not true. Using SQLite database...');
    }
    // Fallback to SQLite
    isSqlite = true;
    const dbPath = path_1.default.resolve(__dirname, '../../database.sqlite');
    console.log(`Initializing SQLite database at: ${dbPath}`);
    return new Promise((resolve, reject) => {
        sqliteDb = new sqlite3_1.default.Database(dbPath, (err) => {
            if (err) {
                console.error('Error opening SQLite database:', err.message);
                reject(err);
            }
            else {
                console.log('Successfully connected to SQLite database.');
                setupSqliteSchema()
                    .then(() => resolve())
                    .catch((schemaErr) => reject(schemaErr));
            }
        });
    });
}
async function setupSqliteSchema() {
    if (!sqliteDb)
        return;
    const runQuery = (sql) => {
        return new Promise((resolve, reject) => {
            sqliteDb.run(sql, (err) => {
                if (err)
                    reject(err);
                else
                    resolve();
            });
        });
    };
    const getQuery = (sql) => {
        return new Promise((resolve, reject) => {
            sqliteDb.get(sql, (err, row) => {
                if (err)
                    reject(err);
                else
                    resolve(row);
            });
        });
    };
    try {
        // Users Table
        await runQuery(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);
        // Code Reviews Table
        await runQuery(`
      CREATE TABLE IF NOT EXISTS code_reviews (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER,
        language TEXT NOT NULL,
        source_code TEXT NOT NULL,
        mode TEXT NOT NULL DEFAULT 'developer',
        ai_feedback TEXT,
        rule_feedback TEXT,
        runtime_feedback TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
      )
    `);
        // Knowledge Base Table
        await runQuery(`
      CREATE TABLE IF NOT EXISTS knowledge_base (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        category TEXT NOT NULL,
        language TEXT NOT NULL,
        pattern TEXT NOT NULL,
        solution TEXT NOT NULL
      )
    `);
        // Seed Knowledge Base if empty
        const row = await getQuery('SELECT COUNT(*) as count FROM knowledge_base');
        if (row && row.count === 0) {
            console.log('Seeding SQLite Knowledge Base with initial data...');
            const seedStatements = [
                {
                    title: 'Unintentional Global Variables',
                    category: 'bug_pattern',
                    language: 'javascript',
                    pattern: 'Implicit declaration of variables without let, const, or var',
                    solution: 'Always declare variables using `const` (for constants) or `let` (for re-assignable variables) to prevent polluting the global scope and causing hard-to-debug side effects.'
                },
                {
                    title: 'Floating Point Math Imprecision',
                    category: 'bug_pattern',
                    language: 'javascript',
                    pattern: 'Direct comparisons of floating point calculations (e.g., 0.1 + 0.2 === 0.3)',
                    solution: 'Due to binary representation issues, floating-point math in JS is imprecise. Compare differences to `Number.EPSILON`: `Math.abs((0.1 + 0.2) - 0.3) < Number.EPSILON`.'
                },
                {
                    title: 'SQL Injection Vulnerability',
                    category: 'security',
                    language: 'javascript',
                    pattern: 'Direct string concatenation in query templates',
                    solution: 'Avoid direct string concatenation in database operations. Always use parameterized queries or prepared statements: `db.query("SELECT * FROM users WHERE id = ?", [id])`.'
                },
                {
                    title: 'Hardcoded API Keys',
                    category: 'security',
                    language: 'javascript',
                    pattern: 'Presence of secrets like API keys or passwords directly inside the code strings',
                    solution: 'Store credentials, API tokens, and environment configurations in secure configuration files (`.env`) and read them via `process.env.API_KEY` rather than committing them in plain text.'
                },
                {
                    title: 'Mutable Default Arguments',
                    category: 'bug_pattern',
                    language: 'python',
                    pattern: 'Defining functions with mutable structures like lists/dicts as default arguments',
                    solution: 'In Python, default arguments are evaluated once when the function is defined. If you modify a mutable list, it accumulates values across calls. Change to `def func(a=None):` and initialize inside: `if a is None: a = []`.'
                },
                {
                    title: 'File Handling Without context manager',
                    category: 'best_practice',
                    language: 'python',
                    pattern: 'Opening files with open() and not calling file.close() inside a finally block',
                    solution: 'Use the `with` context manager block `with open(filepath) as f:` to ensure file handlers are automatically released and closed even if an exception occurs during reading/writing.'
                },
                {
                    title: 'Inefficient String Concatenation in Loops',
                    category: 'optimization',
                    language: 'python',
                    pattern: 'Iteratively using + to combine strings inside loops',
                    solution: 'Strings are immutable in Python. Using `+` in a loop creates a new string object each time. Use `.join()` on a list of components: `"".join(list_of_strings)` which is far faster for larger iterations.'
                },
                {
                    title: 'Memory Leak through Raw Pointers',
                    category: 'bug_pattern',
                    language: 'cpp',
                    pattern: 'Using new/malloc without calling corresponding delete/free',
                    solution: 'Always ensure heap-allocated objects are released. Use smart pointers like `std::unique_ptr` or `std::shared_ptr` from `<memory>` to handle cleanups automatically (RAII pattern) and avoid dangling references.'
                },
                {
                    title: 'Buffer Overflow in String Handling',
                    category: 'security',
                    language: 'cpp',
                    pattern: 'Using strcpy, strcat, or raw arrays for user input without bounds checks',
                    solution: 'Avoid deprecated C functions. Use `std::string` which resizes dynamically, and utilize safer routines like `strncpy` or specify bounds when handling standard string streams.'
                },
                {
                    title: 'Array Index Out of Bounds',
                    category: 'bug_pattern',
                    language: 'cpp',
                    pattern: 'Iterating beyond the capacity of an array (e.g. index >= array_size)',
                    solution: 'Ensure loop conditions strictly compare indices to sizes: `for (int i = 0; i < size; ++i)`. Access elements via bound-checked containers like `std::vector::at()` instead of `operator[]` to raise exceptions on safety violations.'
                },
                {
                    title: 'NullPointerException Risk',
                    category: 'bug_pattern',
                    language: 'java',
                    pattern: 'Accessing methods on objects without prior null validation',
                    solution: 'Check objects for null before accessing fields, or utilize Java 8 `Optional<T>` to explicitly model optional properties and avoid unexpected application crashes.'
                },
                {
                    title: 'Inefficient Memory Usage with String Concatenation',
                    category: 'optimization',
                    language: 'java',
                    pattern: 'Repeatedly combining strings with + inside high-iteration loops',
                    solution: 'In Java, string concatenation inside loops creates unnecessary `String` and `StringBuilder` allocations. Use `StringBuilder.append()` explicitly inside loops for high performance.'
                },
                {
                    title: 'Resource Leak due to Unclosed Streams',
                    category: 'bug_pattern',
                    language: 'java',
                    pattern: 'Opening InputStreams / OutputStreams and not closing them in a finally block',
                    solution: 'Use Java\'s try-with-resources syntax: `try (BufferedReader br = new BufferedReader(...)) { ... }` which automatically executes closures and releases file handles when the block is exited.'
                }
            ];
            for (const item of seedStatements) {
                await new Promise((res, rej) => {
                    sqliteDb.run('INSERT INTO knowledge_base (title, category, language, pattern, solution) VALUES (?, ?, ?, ?, ?)', [item.title, item.category, item.language, item.pattern, item.solution], (err) => {
                        if (err)
                            rej(err);
                        else
                            res();
                    });
                });
            }
            console.log('SQLite Knowledge Base seeded successfully.');
        }
    }
    catch (error) {
        console.error('Error setting up SQLite schema:', error);
        throw error;
    }
}
// Database helper functions
async function query(sql, params = []) {
    if (isSqlite) {
        if (!sqliteDb)
            throw new Error('SQLite DB is not initialized.');
        return new Promise((resolve, reject) => {
            // Check if query is SELECT (returns array) or INSERT/UPDATE/DELETE (returns change status)
            const queryType = sql.trim().split(' ')[0].toUpperCase();
            if (queryType === 'SELECT') {
                sqliteDb.all(sql, params, (err, rows) => {
                    if (err)
                        reject(err);
                    else
                        resolve(rows);
                });
            }
            else {
                sqliteDb.run(sql, params, function (err) {
                    if (err)
                        reject(err);
                    else {
                        resolve({
                            insertId: this.lastID,
                            affectedRows: this.changes,
                        });
                    }
                });
            }
        });
    }
    else {
        if (!mysqlPool)
            throw new Error('MySQL connection pool is not initialized.');
        const [rows] = await mysqlPool.execute(sql, params);
        return rows;
    }
}
function isUsingSqlite() {
    return isSqlite;
}
