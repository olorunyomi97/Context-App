// @ts-nocheck

import moment from "moment";

import { geocodeByPlaceId } from "react-google-places-autocomplete";

//url redirect
export const getRedirect = (
  data: { search: string },
  backupRoute: string
): string => {
  const urlParams = new URLSearchParams(data.search);

  const redirect = urlParams.get("redirect");

  const route = redirect
    ? redirect[0] === "/"
      ? `${redirect}`
      : `/${redirect}`
    : `/${backupRoute}`;
  return route;
};

/**
 * @description Parse geo coding
 * @function parseGeoCoding
 * @returns {string} - googlemap instance
 */
export const parseGeoCoding = (values) => {
  geocodeByPlaceId(values.value.place_id)
    .then((results) => {
      const address_components = results[0].address_components;
      address_components.map((component) => {
        component.types.map((sub_value, key) => {
          if (sub_value == "administrative_area_level_2") {
            values.local_government = component.long_name;
          }
          if (sub_value == "administrative_area_level_1") {
            values.geo_state_name = component.long_name;
            values.geo_state_code = component.short_name;
          }
        });
      });

      if (values.local_government == "") {
        values.local_government = address_components[0].long_name;
      }
    })
    .catch((error) => console.error(error));
};

/**
 * @description Parse all ports
 * @function parseAllPorts
 * @returns {string} - googlemap instance
 */
// export const parseAllPorts = (ports, selectedCountry = " ") => {
//   console.log("seleccoyntry>>>", selectedCountry);
//   let returnPorts = { origin: [], destination: [], new_destination: [] };
//   Object.keys(ports).map((port, index) => {
//     let curr_port = ports[port];
//     if (
//       curr_port.country.toLowerCase() == "nigeria" ||
//       curr_port.country.toLowerCase() == "ghana"
//     ) {
//       let allowed_ports = ["NGTIN", "NGAPP", "NGONN", "NGPHC", "GHTEM", "GHTKD"];
//       let filtered_ports = [];
//       if (selectedCountry.toLowerCase() === "nigeria") {
//         filtered_ports = ["NGTIN", "NGAPP", "NGONN", "NGPHC"]; //Allowed Ports
//       } else if (selectedCountry.toLowerCase() === "ghana") {
//         filtered_ports = ["GHTEM", "GHTKD"];
//       } else {
//         filtered_ports = ["NGTIN", "NGAPP", "NGONN", "NGPHC", "GHTEM", "GHTKD"]; //Allowed Ports
//       }
//       console.log("allowed", allowed_ports);
//       if (allowed_ports.indexOf(curr_port.unlocs[0]) !== -1) {
//         let portObject = {
//           label:
//             curr_port.name +
//             " (" +
//             curr_port.unlocs[0] +
//             ") " +
//             curr_port.country,
//           value: curr_port,
//         };
//         returnPorts.origin.push(portObject);
//       }
//     } else {
//       let portObject = {
//         label:
//           curr_port.name +
//           " (" +
//           curr_port.unlocs[0] +
//           ") " +
//           curr_port.country,
//         value: curr_port,
//       };
//       returnPorts.destination.push(portObject);
//       // returnPorts.new_destination.filter((item)  )
//     }
//   });
//   return returnPorts;
// };

/**
 * @description Parse all ports
 * @function parseAllPorts
 * @returns {string} - googlemap instance
 */
export const parseAllPorts = (ports) => {
  let returnPorts = { origin: [], destination: [] };
  Object.keys(ports).map((port, index) => {
    let curr_port = ports[port];

    if (curr_port.country.toLowerCase() == "nigeria") {
      const allowed_ports = ["NGTIN", "NGAPP", "NGONN", "NGPHC"]; //Allowed Ports

      if (allowed_ports.indexOf(curr_port.unlocs[0]) !== -1) {
        let portObject = {
          label:
            curr_port.name +
            " (" +
            curr_port.unlocs[0] +
            ") " +
            curr_port.country,
          value: curr_port,
        };
        returnPorts.origin.push(portObject);
      }
    } else {
      let portObject = {
        label:
          curr_port.name +
          " (" +
          curr_port.unlocs[0] +
          ") " +
          curr_port.country,
        value: curr_port,
      };
      returnPorts.destination.push(portObject);
    }
  });
  return returnPorts;
};

export const getAllPorts = (ports) => {
  let returnPorts = [];
  Object.keys(ports).map((port, index) => {
    let curr_port = ports[port];
    let portObject = {
      label:
        curr_port.name + " (" + curr_port.unlocs[0] + ") " + curr_port.country,
      value: curr_port,
    };
    returnPorts.push(portObject);
  });
  return returnPorts;
};

export const getAllowedPorts = (ports) => {
  let allowed_ports = [];
  const allowed_countries = ["nigeria", "ghana", "kenya", "senegal", "cameroon", "côte d'ivoire"];

  allowed_ports = Object.values(ports)
    .filter(
      (port) => allowed_countries.includes(port.country.toLowerCase())
    )
    .map((port) => ({
      label: port.name + " (" + port.unlocs[0] + ") " + port.country,
      value: port,
    }));

    return allowed_ports;
}

export const getPortNameByCode = (ports, code) => {
  let portName = '';
  Object.keys(ports).map((port, index) => {
    let curr_port = ports[port];

    if(curr_port.unlocs[0] === code){
      portName = curr_port.name +
      " (" +
      curr_port.unlocs[0] +
      ") " +
      curr_port.country
    }
  })

  return portName;
}

export const getCountryNameByCode = (ports, code) => {
  let country = '';
  Object.keys(ports).map((port, index) => {
    let curr_port = ports[port];

    if(curr_port.unlocs[0] === code){
      country = curr_port.country
    }
  })

  return country;
}

export const parseAllPortsNew = (ports, selectedCountry = " ") => {
  console.log("popo>>>", ports)
  let returnPorts = { origin: [], destination: [] };

  Object.keys(ports).map((port, index) => {
    let curr_port = ports[port];
    if (
      curr_port.country.toLowerCase() == "nigeria" ||
      curr_port.country.toLowerCase() == "ghana" ||
      curr_port.country.toLowerCase() == "kenya"
    ) {
      const allowed_ports = [ "NGTIN", "NGAPP", "NGONN", "NGPHC", "GHTEM", "GHTKD"]; //Allowed Ports

      if (allowed_ports.indexOf(curr_port.unlocs[0]) !== -1) {
        let portObject = {
          label:
            curr_port.name +
            " (" +
            curr_port.unlocs[0] +
            ") " +
            curr_port.country,
          value: curr_port,
        };
        returnPorts.origin.push(portObject);
      }
    }
  });

  const destinationPorts = ["nigeria", "ghana", "kenya", "senegal", "cameroon", "côte d'ivoire" ]

  // selectedCountry.toLowerCase() !== "nigeria" &&
  // selectedCountry.toLowerCase() !== "ghana" &&
  // selectedCountry.toLowerCase() !== "kenya"

  if (destinationPorts.indexOf(selectedCountry.toLowerCase()) === -1) {
    let destination = Object.values(ports)
      .filter(
        (port) =>
          // port.country.toLowerCase() === "nigeria" ||
          // port.country.toLowerCase() === "ghana" ||
          // port.country.toLowerCase() === "kenya"
          destinationPorts.includes(port.country.toLowerCase())
      )
      .map((port) => ({
        label: port.name + " (" + port.unlocs[0] + ") " + port.country,
        value: port,
      }));
    returnPorts.destination = destination;
  } else if (
    // selectedCountry.toLowerCase() === "nigeria" ||
    // selectedCountry.toLowerCase() === "ghana" ||
    // selectedCountry.toLowerCase() === "kenya"
    destinationPorts.includes(selectedCountry.toLowerCase())
  ) {
    let destination = Object.values(ports)
      .filter(
        (port) => port.country.toLowerCase() !== selectedCountry.toLowerCase()
      )
      .map((port) => ({
        label: port.name + " (" + port.unlocs[0] + ") " + port.country,
        value: port,
      }));
    returnPorts.destination = destination;
  }

  return returnPorts;
};

export const getFullPort = (ports, code) => {
  let name = "";
  Object.keys(ports).map((port, index) => {
    let curr_port = ports[port];
    if (code === curr_port.unlocs[0]) {
      name =
        curr_port.name + " (" + curr_port.unlocs[0] + ") " + curr_port.country;
    }
  });
  return name;
};

export const findDefaultPort = (
  ports: [object],
  port_code: string,
  query: string = null
) => {
  const response = ports.filter((data: any): object => {
    if (Object.keys(data).length > 0) {
      let param = query ? data.value[query] : data.value.unlocs[0];

      if (param === port_code) {
        return data;
      } else {
        return "";
      }
    }
  });

  return response[0];
};

//get current timestamp
export const getCurrentTimestamp = (day = 0) => {
  let old_date = new Date();

  let date = new Date(old_date.setDate(old_date.getDate() + day));

  // return moment(date).format("DD-MM-YYYY");
  return moment(date).format("YYYY-MM-DD");
  // return date.toISOString().split("T")[0];
};

//format currency
export const formatCurrency = (value, currency) => {
  return `${
    currency && currency.toLowerCase() === "usd"
      ? "$"
      : currency.toLowerCase() === "ngn"
      ? "₦"
      : currency.toLowerCase() === "kes" || currency.toLowerCase() === "ksh"
      ? "KSh"
      : currency.toLowerCase() === "ghs" || currency.toLowerCase() === "ced"
      ? "GH₵"
      : "USD"
  }${new Intl.NumberFormat("en-US").format(parseFloat(value).toFixed(2))}`;
};

export const formatCountryStatesCities = (data: any, type: string) => {
  const countries = data.map((country: any) => {
    const data =
      type === "country"
        ? {
            country_code: country?.isoCode,
          }
        : type === "state"
        ? {
            state_code: country?.isoCode,
          }
        : {
            city_code: country?.isoCode,
          };

    return {
      value: country.name,
      label: country.name,
      ...data,
    };
  });

  return countries;
};
