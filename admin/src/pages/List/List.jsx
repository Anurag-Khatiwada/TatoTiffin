import React, { useEffect, useState } from "react";
import "./List.css";
import newRequest from "../../utils/newRequest";
import { toast, ToastContainer } from "react-toastify";
const List = () => {
  const [list, setList] = useState([]);
  const url='http://localhost:4000'

  const fetchList = async () => {
    try {
      const response = await newRequest.get("/food/list");
      if (response.data.success) {
        setList(response.data.data);
        console.log(list);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleRemove = async (foodId)=>{
    console.log(foodId)
    try{
      const response = await newRequest.post(`/food/remove`,{id:foodId})
      if(response.data.success){
        await fetchList()
        toast.success(response.data.message)
      }
    }catch(error){
      toast.error(error.message)
    }
  }

  useEffect(() => {
    fetchList();
  }, []);
  return (
    <div className="list add flex-col">
      <p>All Foods List</p>
      <div className="list-talble">
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
         
        </div>
        {
            list.map((item,index)=>{
              return(
                <div className="list-table-format" key={index}>
                  <img src={`${url}/images/`+item.image} alt="" />
                  <p>{item.name}</p>
                  <p>{item.category}</p>
                  <p>${item.price}</p>
                  <p onClick={()=>handleRemove(item._id)} className="cursor">X</p>
                </div>
              )
            })
          }
      </div>
    </div>
  );
};

export default List;
