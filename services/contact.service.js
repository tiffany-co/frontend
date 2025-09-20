import http from "@/api/http";
export const getAllContacts = async () => {
  try {
    const response = await http.get("/contacts");
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const createContact = async ({
  first_name,
  last_name,
  national_number,
  phone_number,
  type,
}) => {
  try {
    const response = await http.post("/contacts", {
      first_name: first_name,
      last_name: last_name,
      national_number: national_number,
      phone_number: phone_number,
      type: type,
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const updateContact = async ({
  id,
  first_name,
  last_name,
  national_number,
  phone_number,
  type,
}) => {
  try {
    const response = await http.put(`/contacts/${id}`, {
      first_name: first_name,
      last_name: last_name,
      national_number: national_number,
      phone_number: phone_number,
      type: type,
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const deleteContact = async (id) => {
  try {
    const response = await http.delete(`/contacts/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};
