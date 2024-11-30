import Header from "./_components/Header";
import Sidebar from "./_components/Sidebar";


const DashboardLayout = ({children}) => {
  return (
    <section>
      <div className="md:w-64 h-screen fixed">
        <Sidebar/>
      </div>
      <div className="md:ml-64">
        <div className="px-4 py-3 shadow-md">
        <Header />
        </div>
        <div className="p-4">
          {children}
        </div>
      </div>
      
    </section>
  );
};

export default DashboardLayout;
