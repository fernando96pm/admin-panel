import { FC, useState } from "react";
import { MdDelete } from "react-icons/md";
import MemberData from "../entities/MemberData";

const Member: FC<{ member: MemberData, groupId: number }> = ({ member, groupId }) => {
  const [isAdmin, setIsAdmin] = useState<boolean>(member.isAdmin);

  const adminHandler = () => {
    setIsAdmin(!isAdmin);
    member.setIsAdmin(!member.isAdmin);
    appointAdmin();
  };

  const removeMember = async() => {
    fetch(`http://localhost:8080/groups/${groupId}/members/${member.id}`,
      {
        method: 'DELETE',
      }
    );
  }

  const appointAdmin = async() => {
    console.log('mandando petición');
    console.log(`usuario ${member.id} ` )
    const response = await fetch(`http://localhost:8080/groups/${groupId}/admins/${member.id}`,
      {
        method: 'PUT',
      }
    )
    const data = await response.json();
    console.log(data); 
  }
  return (
    <div className="py-2 sm:py-4 my-2 flex justify-between items-center rounded-xl border-[1px] bg-gray-50 border-gray-300  shadow-md text-base">
      <div className="border-[2px] border-gray-200 rounded-2xl p-2 ml-2">
        <img src={member.image} width="40px" height="40px"/>
      </div>
      <div className="flex-col pl-4 justify-center text-center">
        <p className="text-base sm:text-xl font-bold italic">{member.name}</p>
        <p className="text-sm sm:text-lg ">{member.email}</p>
      </div>
      <div className="flex-col">
        <div className="flex justify-between gap-3 mr-4 mb-6" onClick={adminHandler}>
          <span className="ml-3 text-md font-medium text-gray-900 dark:text-gray-300">
            Admin
          </span>
          <label
            htmlFor={member.email}
            className="inline-flex relative items-center cursor-pointer"
          >
            <input
              type="checkbox"
              checked={isAdmin}
              id={member.id.toString()}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
          </label>
        </div>
        <div className="flex justify-end mr-3">
            <MdDelete className="text-right text-red-600 text-2xl cursor-pointer" onClick={removeMember} />
          </div>
      </div>
    </div>
  );
};
export default Member;
