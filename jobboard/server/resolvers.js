const db = require('./db');

const Query = {
  jobs: () => db.jobs.list(),
  job: (root, { id }) => db.jobs.get(id),
  company: (root, { id }) => db.companies.get(id),
};

const Mutation = {
  createJob: (root, { companyId, title, description }) => {
    return db.jobs.create({ companyId, title, description });
  },
};

const Job = {
  company: (job) => db.companies.get(job.companyId),
};

const Company = {
  jobs: (company) =>
    db.jobs.list().filter((job) => job.companyId === company.id),
};

module.exports = {
  Query,
  Mutation,
  Job,
  Company,
};
