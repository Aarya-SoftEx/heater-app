import React from "react";
// import {
//   adminChangeUserRole,
//   getWorkspaceMembers,
// } from "../../../services/apiService";
// import type {
//   AdminWorkspaceMember,
//   PaginationState,
// } from "../../../types/index.d.ts";
// import Pagination from "../../../components/common/ui-common/Pagination";
// import { useParams } from "react-router-dom";
// import { Link } from "react-router-dom";
// import { toast } from "react-toastify";
// import { useDispatch } from "react-redux";
// import { setLoading } from "../../../state/slices/loadingSlice";

const AdminWorkspaceMembers: React.FC = () => {
  // const [data, setData] = useState<AdminWorkspaceMember[]>([]);
  // const [loading, setLoadingState] = useState<boolean>(true);
  // const [pagination, setPagination] = useState<PaginationState>({
  //   page: 1,
  //   limit: 10,
  //   total: 0,
  //   hasNextPage: false,
  //   hasPrevPage: false,
  // });

  // const [filters, setFilters] = useState({
  //   limit: 10,
  //   page: 1,
  // });

  // const dispatch = useDispatch();

  // const { workspaceId } = useParams<{ workspaceId: string }>();
  // const fetchMembers = async () => {
  //   if (!workspaceId) return;
  //   setLoadingState(true);
  //   try {
  //     const response = await getWorkspaceMembers(workspaceId);
  //     setData(response.data || []);
  //     setPagination((prev) => ({
  //       ...prev,
  //       page: filters.page,
  //       limit: filters.limit,
  //       total: response.data.length || 0,
  //     }));
  //   } catch (error) {
  //     console.error("Failed to fetch workspace members", error);
  //   } finally {
  //     setLoadingState(false);
  //   }
  // };

  // useEffect(() => {
  //   fetchMembers();
  // }, [workspaceId, filters]);

  // const handleRoleChange = async (
  //   userId: number,
  //   newRole: "owner" | "admin" | "member"
  // ) => {
  //   if (!workspaceId) return;
  //   try {
  //     dispatch(setLoading(true));
  //     const res = await adminChangeUserRole({
  //       workspaceId,
  //       userId,
  //       newRole,
  //     });
  //     // refresh list
  //     if (res.success) {
  //       toast.success("Role updated successfully");
  //       fetchMembers();
  //     }
  //   } catch (err: any) {
  //     toast.error(err?.data?.message || "Failed to update role");
  //     console.error("Failed to update role", err);
  //   } finally {
  //     dispatch(setLoading(false));
  //   }
  // };

  return (
    <div className="content p-0 my-5">
      
    </div>
  );
};

export default AdminWorkspaceMembers;
