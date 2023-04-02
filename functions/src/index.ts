import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

admin.initializeApp();

// compromised pole
exports.alertCompromisedPole = functions.firestore.
  document("/San Jose Utility Poles/{pole_id}")
  .onUpdate((event, eventContext) => {
    let tiltChanged = false;
    let batteryChanged = false;
    let Co2Changed = false;

    const poleName = eventContext.params.pole_id;

    const previousTilt: number = +event.before.get("tilt");
    const newTilt: number = +event.after.get("tilt");

    const previousBattery: number = +event.before.get("battery");
    const newBattery: number = +event.after.get("battery");

    const previousCo2: number = +event.before.get("Co2 concentration");
    const newCo2: number = +event.after.get("Co2 concentration");

    if (previousTilt != newTilt) {
      tiltChanged = true;
    }

    if (previousBattery != newBattery ) {
      batteryChanged = true;
    }

    if (previousCo2 != newCo2) {
      Co2Changed = true;
    }

    if (tiltChanged) {
      if (newTilt >= 90) {
        functions.logger.warn("EXTREME ALERT: Pole:" + poleName +
        " has exceeded normal tilt parameter");
      }
    }
    if (batteryChanged) {
      if (newBattery <= 50) {
        functions.logger.warn("WARNING: " + poleName + " Battery Level:" +
       newBattery);
      }
    }
    if (Co2Changed) {
      if ( newCo2 >= 0.5) {
        functions.logger.warn("WARNING FIRE at " + poleName );
      }
    }
  });
