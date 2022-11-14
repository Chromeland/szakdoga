<?php

class DB
{
    private static $instance;
    /**
     * @var array An array of the database connections. The connections are PDO objects,
     * indexed by the name of the database they are connecting to.
     */
    private static $connections = [];

    /**
     * Returns a PDO object connected to the specified database.
     * Connections are stored in the $connections array, indexed by the name of the database they are connecting to.
     * First, the method checks if there is an open connection to the database in the $connections array,
     * and if there is, it returns that value, without opening a new connection.
     * This way, a connection to a database only has to be made once per request.
     * @param string $dbName The name of the database to make the connection to.
     * @return PDO|null The PDO object of the database connection, or null, if no dbName was specified.
     */
    private function getConnection(string $dbName): ?PDO
    {
        if (!$dbName) {
            return null;
        }

        if (self::$connections[$dbName]) {
            return self::$connections[$dbName];
        }

        // Research and tests needs to be done on how to handle them
        $hostName = 'localhost:3306';
        self::$connections[$dbName] = new PDO(
            "mysql:host=$hostName;dbname=$dbName;charset=utf8mb4",
            [
                PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                //PDO::ATTR_PERSISTENT => true,
                PDO::ATTR_EMULATE_PREPARES => false,
                PDO::ATTR_STRINGIFY_FETCHES => true,
            ]
        );

        return self::$connections[$dbName];
    }

    /**
     * @param string $dbName The name of the database.
     * @param string $query The query to be executed.
     * @param array $params The value of the placeholders if prepared statements are used.
     * @return bool
     */
    public function query(string $dbName, string $query, array $params = []): bool
    {
        try {
            return $this->getConnection($dbName)->prepare($query)->execute($params);
        } catch (PDOException $e) {
            $this->logError($e, $query, $params);
            return false;
        }
    }
}