export const successResponse = (res,data,message = "Sucess",status=200)=>{
    return res.status(status).json({
        success:true,
        message,
        data
    });
};
export const errorResponse = (res,message = "Error",status = 500)=>{
    return res.status(status).json({
        success : false,
        message
    });
};