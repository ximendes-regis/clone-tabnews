function status(request, response) {
  response.status(200).json({ status: "é ok" });
}

export default status;
