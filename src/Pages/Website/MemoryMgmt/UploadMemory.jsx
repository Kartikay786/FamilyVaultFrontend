import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { X, Upload, Camera, Video, Mic, FileText, Plus } from 'lucide-react';
import axios from 'axios';


const Uploadmemory = ({ setAddMemoryPopupOpen }) => {
  const modalRef = useRef(null);
  const backdropRef = useRef(null);
  const [dragActive, setDragActive] = useState(false);
  const [uploadType, setUploadType] = useState('photo');
  const [title,setTitle] = useState('');
  const [description,setDescription] = useState('');
  const uploadBy = localStorage.getItem('memberId');
  const familyId = localStorage.getItem('familyId');
  const [vaultId,setVaultId] = useState('');
  const [profileImage,setProfileImage] = useState(null);
  const [video,setVideo] = useState(null);
  const [files, setFiles] = useState([]);
   const [vaults, setVaults] = useState([]);

  const uploadTypes = [
    { type: 'Photo', icon: Camera, label: 'Photos', color: 'from-blue-500 to-cyan-500' },
    { type: 'Video', icon: Video, label: 'Videos', color: 'from-purple-500 to-pink-500' },
    { type: 'Audio', icon: Mic, label: 'Audio', color: 'from-green-500 to-emerald-500' },
  ];


  useEffect(() => {
    const familyId = localStorage.getItem('familyId');
    const memberId = localStorage.getItem('memberId');

    const fetchAllVaults = async () => {
      try {
        const result = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/vault/getfamilyvaults/${familyId}/${memberId}`);
        // console.log(result);
        setVaults(result?.data?.vaults);
      }
      catch (err) {
        console.log(err);
      }
    }

    fetchAllVaults();
  }, [])

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Backdrop animation
      gsap.fromTo(backdropRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.3, ease: "power2.out" }
      );

      // Modal animation
      gsap.fromTo(modalRef.current,
        { scale: 0.8, opacity: 0, y: 50 },
        { scale: 1, opacity: 1, y: 0, duration: 0.4, ease: "power3.out", delay: 0.1 }
      );
    });

    return () => ctx.revert();
  }, []);

  const handleClose = () => {
    gsap.to(modalRef.current, {
      scale: 0.8,
      opacity: 0,
      y: 50,
      duration: 0.3,
      ease: "power2.in"
    });
    gsap.to(backdropRef.current, {
      opacity: 0,
      duration: 0.3,
      ease: "power2.in",
      onComplete: setAddMemoryPopupOpen(false)
    });
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFiles([...files, ...Array.from(e.dataTransfer.files)]);
    }
  };

  const handleFileSelect = (e) => {
    if(uploadType === 'Photo'){
      setProfileImage(e.target.files[0])
    }
    else{
      setVideo(e.target.files[0])
    }
  };

  const UploadMedia = async (e)=>{
    e.preventDefault();

    // if(files?.length === 0) {
    //   alert('Please media');
    //   return
    // }
    
    const formData = new FormData();
    formData.append('title',title);
    formData.append('description',description);
    formData.append('uploadType',uploadType);
    formData.append('uploadBy',uploadBy);
    formData.append('familId',familyId);
    formData.append('vaultId',vaultId);
    if(uploadType === 'Photo'){
    formData.append('profileImage',profileImage);
    }
    else{
    formData.append('video',video);
    }

    try{
      const result = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/memory/uploadMemory`,formData);
      console.log(result)
    }
    catch(err){
      console.log(err);
    }
    finally{
      setTitle('');
      setDescription('');
      setProfileImage(null);
      setVideo(null);
      setVaultId('');
      setUploadType('Photo')
    }
  }

  return (
    <div ref={backdropRef} className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div ref={modalRef} className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 w-full max-w-2xl max-h-[90vh] overflow-x-auto ">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/20">
          <h2 className="text-2xl font-bold text-white">Upload Memory</h2>
          <button
            onClick={handleClose}
            className="p-2 text-purple-300 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-300"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Upload type selector */}
          <div>
            <label className="block text-white text-sm font-medium mb-3">Upload Type</label>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
              {uploadTypes.map((type) => (
                <button
                  key={type.type}
                  onClick={() => setUploadType(type.type)}
                  className={`p-4 rounded-xl border transition-all duration-300 ${uploadType === type.type
                      ? 'border-purple-400 bg-purple-500/20'
                      : 'border-white/20 bg-white/5 hover:bg-white/10'
                    }`}
                >
                  <div className={`w-8 h-8 bg-gradient-to-br ${type.color} rounded-lg flex items-center justify-center mx-auto mb-2`}>
                    <type.icon className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-white text-sm">{type.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* File upload area */}
          <div
            className={`border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 ${dragActive
                ? 'border-purple-400 bg-purple-500/20'
                : 'border-white/30 bg-white/5 hover:bg-white/10'
              }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Upload className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-white text-lg font-semibold mb-2">
              Drop files here or click to browse
            </h3>
            <p className="text-purple-200 mb-4">
              Support for images, videos, and audio files up to 100MB
            </p>
            <input
              type="file"
              multiple
              onChange={handleFileSelect}
              className="hidden"
              id="file-upload"
            />
            <label
              htmlFor="file-upload"
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-xl hover:shadow-lg transition-all duration-300 transform hover:scale-105 cursor-pointer"
            >
              <Plus className="w-5 h-5" />
              <span>Select Files</span>
            </label>
          </div>

          {/* Selected files */}
          {files.length > 0 && (
            <div>
              <label className="block text-white text-sm font-medium mb-3">
                Selected Files ({files.length})
              </label>
              <div className="space-y-2 max-h-32 overflow-y-auto">
                {files.map((file, index) => (
                  <div key={index} className="flex items-center justify-between bg-white/5 rounded-lg p-3">
                    <span className="text-white text-sm">{file.name}</span>
                    <button
                      onClick={() => setFiles(files.filter((_, i) => i !== index))}
                      className="text-purple-300 hover:text-white transition-colors duration-300"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Memory details */}
          <div className="space-y-4">
            <div>
              <label className="block text-white text-sm font-medium mb-2">Memory Title</label>
              <input
                type="text"
                name='title'
                value={title}
                onChange={(e)=>setTitle(e.target.value)}
                placeholder="Give your memory a title..."
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div>
              <label className="block text-white text-sm font-medium mb-2">Description</label>
              <textarea
                value={description}
                onChange={(e)=>setDescription(e.target.value)}
                placeholder="Share the story behind this memory..."
                rows={3}
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
              />
            </div>

            <div>
              <label className="block text-white text-sm font-medium mb-2">Choose Vault (optional) </label>
              <select
                onChange={(e) => setVaultId(e.target.value)}
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option className='text-purple-900' value="">Choose Vault </option>

                {
                  vaults.map((vault)=>(
                      <option className='text-purple-900' value={vault._id}>{vault.vaultName}</option>
                  ))
                }
              </select>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end space-x-4 p-6 border-t border-white/20">
          <button
            onClick={handleClose}
            className="px-6 py-3 text-purple-300 hover:text-white transition-colors duration-300"
          >
            Cancel
          </button>
          <button onClick={UploadMedia} className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:shadow-lg transition-all duration-300 transform hover:scale-105">
            Upload Memory
          </button>
        </div>
      </div>
    </div>
  );
};

export default Uploadmemory;