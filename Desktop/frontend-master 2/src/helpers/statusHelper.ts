const getStatusBg = (status) => {
    let bgStatus = '';

    if (status === "pending approval") {
        bgStatus = "background-green";
    } else if (status === "in transit") {
        bgStatus = "bg-[#ECFBFF]";
    } else if (status === "new") {
        bgStatus = "bg-[#FFFADF]";
    } else if (status === "file opening") {
        bgStatus = "bg-[#ffe75d33]";
    } else if (status === "file closed") {
        bgStatus = "bg-[#98ff9b4d]";
    } else if (status === "cancelled") {
        bgStatus = "bg-red-100";
    } else {
        bgStatus = ""
    }

    return bgStatus;
}

export { getStatusBg };

const getStausTextColor = (status) => {
    let textStatus = '';

    if (status === "pending approval") {
        textStatus = "text-[#059C01]";
    } else if (status === "in transit") {
        textStatus = "text-[#296FD8]";
    } else if (status === "new") {
        textStatus = "text-[#C27500]";
    } else if (status === "file opening") {
        textStatus = "text-[#DB8900]";
    } else if (status === "file closed") {
        textStatus = "text-[#007200]";
    } else if (status === "file closed") {
        textStatus = "text-red-600";
    } else {
        textStatus = ""
    }

    return textStatus;
}

export { getStausTextColor }