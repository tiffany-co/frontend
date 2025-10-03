import {
  createContact,
  deleteContact,
  getAllContacts,
  getContact,
  updateContact,
} from "@/services/contact.service";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export const useAllContacts = () => {
  return useQuery(["allContacts"], getAllContacts, {
    onError: (error) => {
      return error;
    },
  });
};
export const useContact = (id) => {
  return useQuery(["Contact", id], () => getContact(id), {
    enabled: !!id,
    onError: (error) => {
      return error;
    },
  });
};
export const useContactCreate = () => {
  const queryClient = useQueryClient();
  return useMutation(createContact, {
    onSuccess: () => {
      queryClient.invalidateQueries(["allContact"]);
    },
    onError: (error) => {
      return error;
    },
  });
};

export const useContactUpdate = () => {
  const queryClient = useQueryClient();
  return useMutation(updateContact, {
    onSuccess: () => {
      queryClient.invalidateQueries(["allContact"]);
    },
    onError: (error) => {
      return error;
    },
  });
};

export const useContactDelete = () => {
  const queryClient = useQueryClient();
  return useMutation(deleteContact, {
    onSuccess: () => {
      queryClient.invalidateQueries(["allContact"]);
    },
    onError: (error) => {
      return error;
    },
  });
};
