import { AxiosInstance } from "@/utils/axiosInstance";
import React, { useEffect, useState } from "react";
import Model from "./Model";
import LoaderComponent from "../common/loader/loader";

const ViewModels = () => {
  const [loading, setLoading] = useState(false);
  const [allModels, setAllModels] = useState<
    {
      name: string;
      id: string;
      description: string;
      avatar: string;
    }[]
  >([]);
  const getAllModels = () => {
    setLoading(true);
    AxiosInstance.get("/model-spaces")
      .then((res) => {
        setAllModels(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    getAllModels();
  }, []);

  if(loading) {
    return <LoaderComponent />
  }

  return (
    <section className="bg-muted py-12 md:py-16 lg:py-20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {allModels.map(ele=>{
            return <Model {...ele} key={ele.id} />
          })}
        </div>
      </div>
    </section>
  );
};

export default ViewModels;
