package com.codes;

import java.sql.*;

public class Main {

    public static final String DB_NAME = "testjava.db";
    public static final String CONNECTION_STRING = "jdbc:sqlite:C:\\Users\\Guray\\Desktop\\Java Projects\\SQLWithJava\\" +DB_NAME;
    public static final String TABLE_CONTACTS = "contacts";
    public static final String COLUMN_NAME = "name";
    public static final String COLUMN_PHONE = "phone";
    public static final String COLUMN_EMAIL = "email";

    public static void main(String[] args) {

        try {
            Connection conn = DriverManager.getConnection(CONNECTION_STRING);
            Statement statement = conn.createStatement();

            statement.execute("drop table if exists " + TABLE_CONTACTS);
            statement.execute("create table if not exists " + TABLE_CONTACTS + "( " + COLUMN_NAME + " TEXT, " + COLUMN_PHONE + " INTEGER, " + COLUMN_EMAIL + " TEXT" + " )");
            statement.execute("delete from contacts where name = 'Hello'");
//            statement.execute("select * from contacts");
//            ResultSet resultSet = statement.getResultSet();
            statement.execute("INSERT INTO " + TABLE_CONTACTS + " ( " + COLUMN_NAME + ", " + COLUMN_PHONE + ", " + COLUMN_EMAIL + ")" + "VALUES ('Hello', 32123, 'Hello@gmail.com')");
            statement.execute("INSERT INTO " + TABLE_CONTACTS + " ( " + COLUMN_NAME + ", " + COLUMN_PHONE + ", " + COLUMN_EMAIL + ")" + "VALUES ('Jane', 532341, 'Jane@gmail.com')");
            statement.execute("INSERT INTO " + TABLE_CONTACTS + " ( " + COLUMN_NAME + ", " + COLUMN_PHONE + ", " + COLUMN_EMAIL + ")" + "VALUES ('Tim', 123123123, 'Tim@gmail.com')");
            statement.execute("INSERT INTO " + TABLE_CONTACTS + " ( " + COLUMN_NAME + ", " + COLUMN_PHONE + ", " + COLUMN_EMAIL + ")" + "VALUES ('Alp', 8900, 'Alp@gmail.com')");

            ResultSet resultSet = statement.executeQuery("Select * from contacts");
            while (resultSet.next()){
                System.out.println(resultSet.getString("name") + " " + resultSet.getInt("phone") + " " + resultSet.getString("email"));
            }

            resultSet.close();
            statement.close();
            conn.close();

        } catch (SQLException e){
            System.out.println(e.getMessage());
        }

    }
}
