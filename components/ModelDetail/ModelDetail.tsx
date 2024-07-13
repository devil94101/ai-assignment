import { AxiosInstance } from "@/utils/axiosInstance";
import React, { useEffect, useState } from "react";
import Input from "../common/input";
import { UploadComponent } from "../common/uploadComponent";
import ChatComponent from "../viewModels/PreviousData";
import LoaderComponent from "../common/loader/loader";
import { showToast } from "../common/toastr";

type InputData = {
  name: string;
  description: string;
  type: string;
  required: true;
  default: null;
};

type ModelDetailType = {
  name: string;
  id: string;
  description: string;
  avatar: string;
  inputs: InputData[];
  outputs: {
      name: string
      description: string;
      type: string;
  }[];
};

const ModelDetail = ({ id }: { id: string }) => {
  const [modelData, setModelData] = useState<ModelDetailType>();
  const [formInputData, setFormInputData] = useState<{
    [key: string]: string | number | File;
  }>({});
  const [error, setError] = useState<{
    [key: string]: string;
  }>({});

  const [previousData, setPreviousData] = useState<
    {
      inputData: {
        [key: string]: string | number | File;
      };
      inputs: InputData[];
      response: string;
      id: string;
    }[]
  >([]);

  const [loading, setLoading] = useState(false);
  const [loadData, setLoadData] = useState(false);

  const checkErrors = () => {
    let isError = false;
    const errors: { [key: string]: string } = {};
    for (let i of modelData?.inputs || []) {
      if (!formInputData[i.name]) {
        isError = true;
        errors[i.name] = `${i.name} is required field`;
      }
    }
    setError({ ...errors });
    return isError;
  };

  const predictValue = () => {
    if (checkErrors()) {
      return;
    }

    AxiosInstance.post("/model-spaces/" + id + "/predict", formInputData)
      .then((res) => {
        console.log(res);
        setPreviousData([
          ...previousData,
          {
            inputData: formInputData,
            response: res.data.data?.["Generated Text"] || res.data.data?.["Transcription"] || res.data.data?.["Generated Image"],
            inputs: modelData?.inputs || [],
            id: Date.now() + "test"
          },
        ]);
      })
      .catch((_err) => {});
  };

  useEffect(() => {
    setLoadData(true);
    AxiosInstance.get("/model-spaces/" + id)
      .then((res) => {
        setModelData(res.data.data);
      })
      .catch(() => {
        showToast.error("Something went wront while fetching data")
      })
      .finally(() => {
        setLoadData(false);
      });
  }, [id]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormInputData({
      ...formInputData,
      [e.target.name]: e.target.value,
    });
    const newError = { ...error };
    delete newError[e.target.name];
    setError(newError);
  };

  const handleFile = (e: File[], name: string) => {
    setFormInputData({
      ...formInputData,
      [name]: e[0],
    });
    const newError = { ...error };
    delete newError[name];
    setError(newError);
  };

  if(loadData ) {
    return <LoaderComponent/>
  }

  return (
    <div className="px-4 flex flex-col justify-between h-[88vh] py-2">
      <div className="h-3/4 ">
        <ChatComponent previousData={previousData} avatar={modelData?.avatar} type={modelData?.outputs?.[0]?.type || ''} />
      </div>
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 py-2">
        {modelData?.inputs.map((ele) => {
          if (ele.type === "audio") {
            return (
              <UploadComponent
                onChange={(e) => handleFile(e, ele.name)}
                label={ele.name}
                file={formInputData?.[ele.name] as File}
                accept={{
                  "audio/*": [],
                }}
                error = {error?.[ele.name] || ''}
              />
            );
          }
          if (ele.type === "video") {
            return (
              <UploadComponent
                onChange={(e) => handleFile(e, ele.name)}
                label={ele.name}
                file={formInputData?.[ele.name] as File}
                accept={{
                  "video/*": [],
                }}
                error = {error?.[ele.name] || ''}
              />
            );
          }
          if (ele.type === "image") {
            return (
              <UploadComponent
                onChange={(e) => handleFile(e, ele.name)}
                label={ele.name}
                file={formInputData?.[ele.name] as File}
                error = {error?.[ele.name] || ''}
              />
            );
          }
          return (
            <Input
              name={ele.name}
              type={ele.type}
              placeholder={ele.name}
              value={(formInputData?.[ele.name] as string) || ""}
              onChange={onChange}
              error={error?.[ele.name]}
            />
          );
        })}
      </div>
      <button onClick={predictValue} className="w-full btn btn-outline">
        {loading? <LoaderComponent/>: "Predict Value using " + modelData?.name} 
      </button>
    </div>
  );
};

export default ModelDetail;
