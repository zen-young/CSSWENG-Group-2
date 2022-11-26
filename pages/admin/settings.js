import Admin_Panel from "../../components/admin_pages/admin_panel";
import ProtectedRoute from "../../components/ProtectedRoute/ProtectedRoute";

function Admin() {
  return (
    <ProtectedRoute>
      <Admin_Panel />
    </ProtectedRoute>
  );
}

export default Admin;
