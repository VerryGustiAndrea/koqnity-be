import dotenv from 'dotenv';
import pg from 'pg';
import mysql from 'mysql2';

// ###
import connect from './connection';
// ###
const conn = connect(dotenv, mysql);
// ###

export default conn;
