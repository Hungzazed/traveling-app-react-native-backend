const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { serviceService } = require('../services');

const createService = catchAsync(async (req, res) => {
  const service = await serviceService.createService(req.body);
  res.status(httpStatus.CREATED).send(service);
});

const getServices = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['type', 'name']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await serviceService.queryServices(filter, options);
  res.send(result);
});

const getService = catchAsync(async (req, res) => {
  const service = await serviceService.getServiceById(req.params.serviceId);
  if (!service) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Service not found');
  }
  res.send(service);
});

const updateService = catchAsync(async (req, res) => {
  const service = await serviceService.updateServiceById(req.params.serviceId, req.body);
  res.send(service);
});

const deleteService = catchAsync(async (req, res) => {
  await serviceService.deleteServiceById(req.params.serviceId);
  res.status(httpStatus.NO_CONTENT).send();
});

const searchServices = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['type', 'minPrice', 'maxPrice']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await serviceService.searchServices(filter, options);
  res.send(result);
});

module.exports = {
  createService,
  getServices,
  getService,
  updateService,
  deleteService,
  searchServices,
};
