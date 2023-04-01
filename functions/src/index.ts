import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

admin.initializeApp(functions.config().firebase);

const db = functions.database;

// let excessiveTilt = false;
// let fireDetected = false;
// let batteryLow = false;


// compromised pole
exports.checkTilt = db.ref("/San Jose Utility/{pole_id}/tilt")
  .onUpdate((event, eventContext) => {
    const poleName = eventContext.params.pole_id;

    // const previousValue: number = +event.before.val;
    const newValue: number = +event.after.val;

    if (newValue >= 90) {
      functions.logger.warn("EXTREME ALERT: Pole:" + poleName +
      " has exceeded normal tilt parameter");
    }
  });
