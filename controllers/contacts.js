const { Contact } = require("../models/contacts");
const { HttpError, ctrlWrapper } = require("../helpers");

const getAll = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 20, favorite } = req.query;
  const skip = (page - 1) * limit;

  const filters = { owner };
  if (favorite) {
    filters.favorite = favorite;
  }
  const allContacts = await Contact.find(filters, { skip, limit }).populate(
    "owner",
    "email subscription"
  );

  res.status(200).json(allContacts);
};

const getById = async (req, res) => {
  const { contactId } = req.params;
  const { user } = req;
  const result = await Contact.findOne({ _id: contactId, owner: user._id });
  if (!result) {
    throw HttpError(404, "Not Found");
  }
  res.status(200).json(result);
};

const add = async (req, res) => {
  const { _id: owner } = req.user;
  const result = await Contact.create(...req.body, owner);
  res.status(201).json(result);
};

const updateById = async (req, res) => {
  const { contactId } = req.params;
  const { body, user } = req;
  const result = await Contact.findOneAndUpdate(
    { _id: contactId, owner: user._id },
    body,
    {
      new: true,
    }
  );
  if (!result) {
    throw HttpError(404, "Not Found");
  }
  res.status(200).json(result);
};

const updateFavorite = async (req, res) => {
  const { contactId } = req.params;
  const { body, user } = req;
  const result = await Contact.findOneAndUpdate(
    { _id: contactId, owner: user._id },
    body,
    {
      new: true,
    }
  );
  if (!result) {
    throw HttpError(404, "Not Found");
  }
  res.status(200).json(result);
};

const deleteById = async (req, res) => {
  const { contactId } = req.params;
  const { user } = req;
  const result = await Contact.findOneAndDelete({
    _id: contactId,
    owner: user._id,
  });
  if (!result) {
    throw HttpError(404, "Not Found");
  }
  res.status(200).json({ message: "contact deleted" });
};

module.exports = {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  add: ctrlWrapper(add),
  updateById: ctrlWrapper(updateById),
  deleteById: ctrlWrapper(deleteById),
  updateFavorite: ctrlWrapper(updateFavorite),
};
