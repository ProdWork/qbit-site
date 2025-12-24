const API_BASE = '/data';

export async function fetchCompany() {
  const response = await fetch(`${API_BASE}/company.json`);
  if (!response.ok) throw new Error('Failed to fetch company data');
  return response.json();
}

export async function fetchServices() {
  const response = await fetch(`${API_BASE}/services.json`);
  if (!response.ok) throw new Error('Failed to fetch services');
  return response.json();
}

export async function fetchIndustries() {
  const response = await fetch(`${API_BASE}/industries.json`);
  if (!response.ok) throw new Error('Failed to fetch industries');
  return response.json();
}

export async function fetchSolutions() {
  const response = await fetch(`${API_BASE}/solutions.json`);
  if (!response.ok) throw new Error('Failed to fetch solutions');
  return response.json();
}

export async function fetchCaseStudies() {
  const response = await fetch(`${API_BASE}/case-studies.json`);
  if (!response.ok) throw new Error('Failed to fetch case studies');
  return response.json();
}

export async function fetchCaseStudy(id) {
  const studies = await fetchCaseStudies();
  const study = studies.find(s => s.id === id);
  if (!study) throw new Error('Case study not found');
  return study;
}

export async function fetchTechnology() {
  const response = await fetch(`${API_BASE}/technology.json`);
  if (!response.ok) throw new Error('Failed to fetch technology');
  return response.json();
}

export async function fetchOpenSource() {
  const response = await fetch(`${API_BASE}/opensource.json`);
  if (!response.ok) throw new Error('Failed to fetch open source data');
  return response.json();
}

export async function fetchResources() {
  const response = await fetch(`${API_BASE}/resources.json`);
  if (!response.ok) throw new Error('Failed to fetch resources');
  return response.json();
}

export async function fetchProcess() {
  const response = await fetch(`${API_BASE}/process.json`);
  if (!response.ok) throw new Error('Failed to fetch process');
  return response.json();
}

export async function fetchTools() {
  const response = await fetch(`${API_BASE}/tools.json`);
  if (!response.ok) throw new Error('Failed to fetch tools');
  return response.json();
}

export async function fetchSocial() {
  const response = await fetch(`${API_BASE}/social.json`);
  if (!response.ok) throw new Error('Failed to fetch social links');
  return response.json();
}
