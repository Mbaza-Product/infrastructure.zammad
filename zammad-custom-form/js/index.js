const form = document.querySelector("#takevalue");
function validationform() {
  const firstName = document.querySelector("#firstname")?.value;
  const otherName = document.querySelector("#othernames")?.value;
  const nationId = document.querySelector("#nationid")?.value;
  const phoneNumber = document.querySelector("#phonenumber")?.value;
  const visitoremail = document.querySelector("#visitoremail")?.value;
  const provinceName = document.querySelector("#provincename")?.value;
  const sectorName = document.querySelector("#sectorname")?.value;
  const districtName = document.querySelector("#districtname")?.value;
  const cellName = document.querySelector("#cellname")?.value;
  const villageName = document.querySelector("#villagename")?.value;
  const visitorMessage = document.querySelector("#visitormessage")?.value;

  const ferror = document.querySelector("#error-fname");
  const lerror = document.querySelector("#error-othername");
  const iderror = document.querySelector("#error-nationid");
  const phonerror = document.querySelector("#error-phonenumber");
  const emailerror = document.querySelector("#error-email")
  const provinceerror = document.querySelector("#error-province");
  const sectorerror = document.querySelector("#error-sector");
  const districterror = document.querySelector("#error-district");
  const cellerror = document.querySelector("#error-cell");
  const villageerror = document.querySelector("#error-village")
  const messageerror = document.querySelector("#error-message");

  let isValid = true;

  if (!firstName || firstName.trim() === "") {
    ferror.innerHTML = "Uzuzamo izina ribanza";
    isValid = false;
  } else {
    ferror.innerHTML = "";
  }
  if (!otherName || otherName.trim() === "") {
    lerror.innerHTML = "Uzuzamo irindi zina";
    isValid = false;
  } else {
    lerror.innerHTML = "";
  }
  if (!nationId || nationId.trim() === "") {
    iderror.innerHTML = "Uzuzamo indangamuntu";
    isValid = false;
  } else {
    iderror.innerHTML = "";
  }
  if (!phoneNumber || phoneNumber.trim() === "") {
    phonerror.innerHTML = "Uzuzamo telefone";
    isValid = false;
  } else {
    phonerror.innerHTML = "";
  }
  if (!provinceName || provinceName.trim() === "") {
    provinceerror.innerHTML = "Uzuzamo Intara";
    isValid = false;
  } else {
    provinceerror.innerHTML = "";
  }
  if (!sectorName || sectorName.trim() === "") {
    sectorerror.innerHTML = "Uzuzamo imeri";
    isValid = false;
  } else {
    sectorerror.innerHTML = "";
  }
  if (!districtName || districtName.trim() === "") {
    districterror.innerHTML = "Uzuzamo akarere";
    isValid = false;
  } else {
    districterror.innerHTML = "";
  }
  if (!cellName || cellName.trim() === "") {
    cellerror.innerHTML = "Uzuzamo akarere";
    isValid = false;
  } else {
    cellerror.innerHTML = "";
  }
  if (!villageName || villageName.trim() === "") {
    villageerror.innerHTML = "Uzuzamo akarere";
    isValid = false;
  } else {
    villageerror.innerHTML = "";
  }
  if (!visitorMessage || visitorMessage.trim() === "") {
    messageerror.innerHTML = "Uzuzamo ubutumwa";
    isValid = false;
  } else {
    messageerror.innerHTML = "";
  }

  if (isValid) {
    const signinUrl = "https://crm.mbaza.dev.cndp.org.rw/api/v1/users";
    const params = {
      firstname: firstName,
      lastname: otherName,
      email: `${phoneNumber}@email.com`,
      password: phoneNumber,
      login: "jdoe",
      roles: ["Customer"],
      group_ids: {
        2: ["create"],
      },
    };

    const ticketUrl = "https://crm.mbaza.dev.cndp.org.rw/api/v1/tickets";
    const addTag = "https://crm.mbaza.dev.cndp.org.rw/api/v1/tags/add";
    const queryUser = `https://crm.mbaza.dev.cndp.org.rw/api/v1/users/search?query=${params.email}@email.com&limit=1`;

    (async () => {
      const loaderEl = document.querySelector("#loading");
      try {
        loaderEl.innerHTML = "Mutegereze...";

        const { data: users } = await axios.get(queryUser, {
          headers: {
            Authorization:
              "Bearer f4DjAcF8mFyMIyF5N8_qfrD9MPIJVGL_J2wDVlT1q4mb6iWRcqqNHQdr8HpQYA17",
            "Content-Type": "application/json",
          },
        });

        let user = users[0];

        if (!user) {
          const { data } = await axios.post(signinUrl, params, {
            headers: {
              Authorization:
                "Bearer f4DjAcF8mFyMIyF5N8_qfrD9MPIJVGL_J2wDVlT1q4mb6iWRcqqNHQdr8HpQYA17",
              "Content-Type": "application/json",
            },
          });
          user = data;
        }

        const ticketParams = {
          title: `${firstName} ${otherName}-${phoneNumber}`,
          group_id: 2,
          customer: `${phoneNumber}@email.com`,
          article: {
            subject: "Website form ticket",
            body: `Name: ${firstName} ${otherName}\nID: ${nationId}\nTel: ${phoneNumber}\nProvince: ${provinceName}\nDistrict: ${districtName}\nSector: ${sectorName}\nCell: ${cellName}\nVillage: ${villageName}\n\n${visitorMessage}`,
            type: "note",
            internal: false,
          },
        };

        const { data: res } = await axios.post(ticketUrl, ticketParams, {
          auth: {
            username: `${phoneNumber}@email.com`,
            password: `${phoneNumber}`,
          },
          headers: {
            "Content-Type": "application/json",
          },
        });

        
const ticketID = res.id;
        const tagParams = {
          object: "Ticket",
          o_id: `${ticketID}`,
          item: `${districtName}`,
        };
        const { data1: res1 } = await axios.post(addTag, tagParams, {
          auth: {
            username: `${phoneNumber}@email.com`,
            password: `${phoneNumber}`,
          },
          headers: {
            
            "Content-Type": "application/json",
          },
        });

        const tagParams2 = {
          object: "Ticket",
          o_id: `${ticketID}`,
          item: `${provinceName}`,
        };

        const { data1: res2 } = await axios.post(addTag, tagParams2, {
          auth: {
            username: `${phoneNumber}@email.com`,
            password: `${phoneNumber}`,
          },
          headers: {
            
            "Content-Type": "application/json",
          },
        });

        const tagParams3 = {
          object: "Ticket",
          o_id: `${ticketID}`,
          item: `${sectorName}`,
        };

        const { data1: res3 } = await axios.post(addTag, tagParams3, {
          auth: {
            username: `${phoneNumber}@email.com`,
            password: `${phoneNumber}`,
          },
          headers: {
            
            "Content-Type": "application/json",
          },
        });

        loaderEl.innerHTML = "";

        form.reset();

        if (res) {
          window.location.href = "/feedback.html";
        }
      } catch (error) {
        loaderEl.innerHTML = "";
        alert(error?.message);
      }
    })();
  }
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  validationform();
});
