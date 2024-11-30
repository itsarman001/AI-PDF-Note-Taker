import { BrandName } from "@/components/BrandName";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Layout, Shield } from "lucide-react";
import UploadPdfDialog from "./UploadPdfDialog";

const Sidebar = () => {
  return (
    <aside className="shadow-md h-full px-6">
      <div className="py-4">
        <BrandName className="text-2xl" />
      </div>
      <div className="mt-1">
        <div>
          <UploadPdfDialog>
            <Button className="w-full">+ Upload PDF</Button>
          </UploadPdfDialog>
        </div>

        <button className="flex items-center gap-2 rounded-lg mt-4 cursor-pointer hover:bg-slate-100">
          <Layout /> Dashboard
        </button>

        <button className="flex items-center gap-2 rounded-lg mt-4 cursor-pointer hover:bg-slate-100">
          <Shield /> Upgrade
        </button>
      </div>

      <div className="absolute bottom-6 w-4/5">
        <Progress value={20} />
        <p className="text-sm mt-1">2 out of 5 pdf uploaded</p>
        <p className="text-sm text-gray-400 mt-2">Upgrade to upload more</p>
      </div>
    </aside>
  );
};

export default Sidebar;
