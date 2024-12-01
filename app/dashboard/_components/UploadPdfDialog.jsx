'use client';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { api } from '@/convex/_generated/api';
import { useUser } from '@clerk/nextjs';

import { useMutation, getFileUrl } from 'convex/react';
import { Loader2Icon } from 'lucide-react';
import { useState } from 'react';
import uuid4 from 'uuid4';

const UploadPdfDialog = ({ children }) => {
  const generateUploadUrl = useMutation(api.fileStorage.generateUploadUrl);
  const addFileEntry = useMutation(api.fileStorage.addFileEntryToDb);
  const user = useUser();

  const [file, setFile] = useState();
  const [fileName, setFileName] = useState('');
  const [loading, setLoading] = useState(false);

  const onFileSelect = (e) => {
    setFile(e.target.files[0]);
  };

  const onUpload = async () => {
    setLoading(true);

    // Get a short-lived upload URL
    const postUrl = await generateUploadUrl();
    // POST the file to the URL
    const result = await fetch(postUrl, {
      method: 'POST',
      headers: { 'Content-Type': file?.type },
      body: file,
    });
    const { storageId } = await result.json();

    console.log('File ID ', storageId);

    // Save the newly allocated storage id to the database
    const fileId = uuid4();
    const fileUrl = await getFileUrl({storageId:storageId});
    // TODO: fix getFileUrl is not a function

    const resp = await addFileEntry({
      fileId: fileId,
      storageId: storageId,
      fileName: fileName ?? 'Untitled',
      fileUrl: fileUrl,
      createdBy: user?.primaryEmailAddress?.emailAddress || 'Unknown User',
      // TODO: undefined user email 
      // TODO: add userId into schema instead of user email
    });
    setLoading(false);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Upload a PDF</DialogTitle>
          <DialogDescription asChild>
            <div className="py-4">
              <div>
                <h4 className="text-sm mb-2">Select a pdf</h4>
              </div>
              <div className="py-2 px-1 border mb-3">
                <input
                  type="file"
                  accept="application/pdf"
                  onChange={(e) => onFileSelect(e)}
                />
              </div>

              <div>
                <label htmlFor="file" className="">
                  File Name
                </label>
                <Input
                  placeholder="Enter File Name"
                  id="file"
                  onChange={(e) => setFileName(e.target.value)}
                />
              </div>
            </div>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="sm:justify-end">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
          <Button type="button" onClick={onUpload}>
            {loading ? <Loader2Icon className="animate-spin" /> : 'Upload'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UploadPdfDialog;
