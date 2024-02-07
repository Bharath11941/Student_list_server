import User from "../models/userModel.js";

export const userRegister = async (req, res) => {
  try {
    
    const { name, email, mobile, gender, education, address } = req.body;
    const existingUser = await User.findOne({ $or: [{ email }, { mobile }] });
    if (existingUser) {
      if (existingUser.email === email) {
        return res
          .status(400)
          .json({ message: "User already existed with this email" });
      } else if (existingUser.mobile === +mobile) {
        return res
          .status(400)
          .json({ message: "User already existed with this mobile number" });
      }
    }
    const user = new User({
      name,
      email,
      mobile,
      gender,
      education,
      address,
    });
    const userData = await user.save();
    if (userData) {
      res.status(200).json({ message: "User added to the table" });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getStudents = async (req, res) => {
  try {
    const { sort, search, pageNumber, rowsPerPage, sortItem } = req.query;
    // let itemsPerPage = 5
    // let pageNo = 0
    // if(rowsPerPage && Number(rowsPerPage) != NaN) itemsPerPage = Number(rowsPerPage)
    // if(pageNumber && Number(pageNumber) != NaN) pageNo = Number(pageNumber)
    const inputs = {};
    // const sortResult = {}
    // let order = 1
    // if(sortItem){
    //   if(sort === "desc") order = -1
    //   sortResult[sortItem] = order
    // }

    if (search !== "") {
      inputs.$or = [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
        { education: { $regex: search, $options: "i" } },
      ];
    }
    // const studentData = await User.find(inputs).sort(sortResult).skip((pageNo * itemsPerPage)).limit(itemsPerPage)
    const studentData = await User.find(inputs);
    // const count = await User.countDocuments()
    res.status(200).json(studentData);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deleteStudent = async (req, res) => {
  try {
    const { id } = req.query;
    const studentData = await User.findByIdAndDelete(id);
    if (studentData) {
      const updatedStudentList = await User.find({});
      return res.status(200).json(updatedStudentList);
    } else {
      return res.status(404).json({ message: "No student" });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
export const editStudent = async (req, res) => {
  try {
    const { name, email, mobile, gender, education, address } = req.body;
   
    const student = await User.findOneAndUpdate(
      { email: email },
      { $set: { name, email, mobile, gender, education, address } },{new:true}
    );
    const studentData = await User.find({})
    if (student) {
      res.status(200).json({ message: "StudentData updated" ,studentData});
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
