import "dotenv/config";
import "reflect-metadata";
import "./aliases";
import api from "@api/server";
import { connect } from "@infrastructure/sql";
import {
    initFirebaseAdmin,
    initFirebaseClient
} from "@api/auth";

initFirebaseAdmin();
initFirebaseClient();


api.listen(process.env.PORT);
connect();

console.log(`Listening on port ${process.env.PORT}`);
