export const getSlotsOfDay = (day, timeSlots) => {
  console.log(day);
  console.log(timeSlots);
  if ((day, timeSlots))
    switch (day) {
      case "Sun": {
        //   console.log(1);
        return timeSlots["1"];
        break;
      }
      case "Mon": {
        //   console.log(2);

        return timeSlots["2"];
        break;
      }
      case "Tue": {
        //   console.log(3);
        return timeSlots["3"];
        break;
      }
      case "Wed": {
        //   console.log(4);
        return timeSlots["4"];
        break;
      }
      case "Thu": {
        //   console.log(5);
        return timeSlots["5"];
        break;
      }
      case "Fri": {
        //   console.log(6);
        return timeSlots["6"];
        break;
      }
      case "Sat": {
        //   console.log(7);
        return timeSlots["7"];
        break;
      }
    }
};
