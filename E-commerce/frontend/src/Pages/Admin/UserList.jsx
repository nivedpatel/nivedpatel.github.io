import { useState, useEffect } from "react";
import { FaEdit, FaCheck, FaTrash, FaTimes } from "react-icons/fa";
import Loader from "../../components/Loader";
import { toast } from "react-toastify";
import {
  useUpdateUserMutation,
  useDeleteUserMutation,
  useGetUsersQuery,
} from "../../redux/api/usersApiSlice";

const UserList = () => {
  const { data: users, refetch, isLoading, error } = useGetUsersQuery();
  const [updateUser] = useUpdateUserMutation();
  const [deleteUser] = useDeleteUserMutation();

  const [editableUserName, setEditableUserName] = useState("");
  const [editableUserEmail, setEditableUserEmail] = useState("");
  const [editableUserId, setEditableUserId] = useState(null);

  useEffect(() => {
    refetch();
  }, [refetch]);

  return (
    <div className="text-white p-4">
      <h1 className="font-semibold text-2xl mb-4">Users</h1>
    </div>
  );
};

export default UserList;
