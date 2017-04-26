// @flow
import {config} from '../config/config';


export function clickhook_get_token(email: string, password: string) {
  return new Promise((resolve, reject) => {

    fetch(`${config.clickhook_api.url}/token?grant_type=password`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: email,
        password: password,
      })
    })
      .then(response => response.json())
      .then(responseJson => {
        if (responseJson.access_token) {
          resolve({
            access_token: responseJson.access_token,
            refresh_token: responseJson.refresh_token,
            expires_in: responseJson.expires_in,
          });
        } else {
          reject(responseJson);
        }
      })
      .catch(error => {
        console.error('#6hh5h error: ', error);
        reject(error);
      });

  });
}

export function clickhook_register_urer(email: string, password: string, name: string) {
  return new Promise((resolve, reject) => {

    const settings = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        account: {
          name,
        },
        user: {
          email,
          password,
          name
        },
      })
    };

    console.log('#jkdsfk call settings: ', settings);

    fetch(`${config.clickhook_api.url}/accounts`, settings)
      .then(response => response.json())
      .then(responseJson => {
        if (responseJson.user) {
          resolve(true);
        } else {
          reject(responseJson);
        }
      })
      .catch(error => {
        console.error('#5hhdh error: ', error);
        reject(error);
      });

  });
}

export function clickhook_get_leads(token: string,
                                    page: number = 1,
                                    search: string = '',
                                    search_important_only: boolean,
                                    filter_workflows: array,
                                    filter_tags: array,
                                    filter_sources: array) {
  return new Promise((resolve, reject) => {

    filter_workflows = filter_workflows || [];
    filter_tags = filter_tags || [];
    filter_sources = filter_sources || [];

    let options = [];
    options.push(`page=${page}`);
    options.push(`search=${search}`);

    if (search_important_only === true) {
      options.push('favorited=true');
    }
    if (filter_workflows.length > 0) {
      filter_workflows.forEach(wf => {
        options.push(`workflow_id=${wf}`);
      });
    }
    if (filter_tags.length > 0) {
      filter_tags.forEach(tag => {
        options.push(`tags[]=${tag}`);
      });
    }
    if (filter_sources.length > 0) {
      filter_sources.forEach(source => {
        options.push(`sources[]=${source.toLowerCase()}`);
      });
    }

    let url = `${config.clickhook_api.url}/leads?${options.join('&')}`;

    fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    })
      .then(response => response.json())
      .then(responseJson => {
        if (responseJson.instances || responseJson.leads) {

          resolve({
            instances: responseJson.instances || [],
            leads: responseJson.leads || [],
            meta: responseJson.meta || {},
          });

        } else {
          reject(responseJson);
        }
      })
      .catch(error => {
        console.error('#6hh5h error: ', error);
        reject(error);
      });

  });
}

export function clickhook_get_workflows(token: string) {
  return new Promise((resolve, reject) => {
    fetch(`${config.clickhook_api.url}/workflows`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    })
      .then(response => response.json())
      .then(responseJson => {
        if (responseJson.workflows || responseJson.user_statistics) {

          resolve({
            workflows: responseJson.workflows || [],
            user_statistics: responseJson.user_statistics || [],
          });

        } else {
          reject(responseJson);
        }
      })
      .catch(error => {
        console.error('#34f44543g error: ', error);
        reject(error);
      });

  });
}

export function clickhook_get_user(token: string) {
  return new Promise((resolve, reject) => {

    fetch(`${config.clickhook_api.url}/users/me?banned=false`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    })
      .then(response => response.json())
      .then(responseJson => {
        if (responseJson.accounts || responseJson.user || responseJson.users) {

          resolve({
            accounts: responseJson.accounts || [],
            user: responseJson.user || {},
            users: responseJson.users || [],
          });

        } else {
          reject(responseJson);
        }
      })
      .catch(error => {
        console.error('#fg3g3g554 error: ', error);
        reject(error);
      });

  });
}

export function clickhook_update_lead({
  token, id, name, email, phone, source, company, city, website,
  state, address, zip, tags, email_hash, custom_fields, archived, favorited
}) {
  return new Promise((resolve, reject) => {

    let lead = {};

    lead.archived = archived === true;

    if (typeof name !== 'undefined') {
      lead.name = name;
    }
    if (typeof email !== 'undefined') {
      lead.email = email;
    }
    if (typeof website !== 'undefined') {
      lead.website = website;
    }
    if (typeof phone !== 'undefined') {
      lead.phone = phone;
    }
    if (typeof source !== 'undefined') {
      lead.source = source;
    }
    if (typeof company !== 'undefined') {
      lead.company = company;
    }
    if (typeof city !== 'undefined') {
      lead.city = city;
    }
    if (typeof state !== 'undefined') {
      lead.state = state;
    }
    if (typeof address !== 'undefined') {
      lead.address = address;
    }
    if (typeof zip !== 'undefined') {
      lead.zip = zip;
    }
    if (typeof tags !== 'undefined') {
      lead.tags = tags;
    }
    if (typeof email_hash !== 'undefined') {
      lead.email_hash = email_hash;
    }
    if (typeof custom_fields !== 'undefined') {
      lead.custom_fields = custom_fields;
    }
    if (typeof favorited !== 'undefined') {
      lead.favorited = favorited === true;
    }

    const settings = {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        lead,
      }),
    };

    console.log('#kdfkjds settings: ', settings);
    console.log(settings.body);

    fetch(`${config.clickhook_api.url}/leads/${id}`, settings)
      .then(response => response.json())
      .then(responseJson => {

        console.log('#ksdjfkdsj update lead result: ', responseJson);
        resolve();

        if (responseJson.accounts || responseJson.user || responseJson.users) {

          resolve({
            accounts: responseJson.accounts || [],
            user: responseJson.user || {},
            users: responseJson.users || [],
          });

        } else {
          reject(responseJson);
        }
      })
      .catch(error => {
        console.error('#fg3g3g554 error: ', error);
        reject(error);
      });

  });
}

export function clickhook_create_lead(token: string, name: string, email: string, phone: string, company: string) {
  return new Promise((resolve, reject) => {

    const lead = {
      name: name === '' ? null : name,
      email: email === '' ? null : email,
      phone: phone === '' ? null : phone,
      company: company === '' ? null : company,
    };

    console.log('#24dfdsf4s4 ------ LEAD --- ', lead);
    fetch(`${config.clickhook_api.url}/leads/`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        lead,
      })
    })
      .then(response => response.json())
      .then(responseJson => {

        if (responseJson.lead || responseJson.instances) {
          resolve();
        } else if (responseJson.errors.length > 0) {
          resolve({error_message: responseJson.errors[0].toString().trim()});
        } else {
          reject(responseJson);
        }
      })
      .catch(error => {
        console.error('#4d442243 error: ', error);
        reject(error);
      });

  });
}

export function clickhook_create_instance(token: string,
                                          lead_id: number,
                                          deal_value: number,
                                          stage_id: number,
                                          workflow_id: number,
                                          lost_reason: string,
                                          assigned_to_id: number) {
  return new Promise((resolve, reject) => {

    fetch(`${config.clickhook_api.url}/instances/`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        instance: {
          lead_id,
          deal_value,
          stage_id,
          workflow_id,
          lost_reason,
          assigned_to_id,
        },
      })
    })
      .then(response => response.json())
      .then(responseJson => {
        console.log('#5y4y6uhe responseJson:', responseJson);
        resolve();
      })
      .catch(error => {
        console.error('#j67rjrj error: ', error);
        reject(error);
      });

  });
}

export function clickhook_update_instance(token: string,
                                          instance_id: string,
                                          deal_value: number,
                                          stage_id: number,
                                          workflow_id: number,
                                          lost_reason: string,
                                          assigned_to_id: number) {
  return new Promise((resolve, reject) => {

    fetch(`${config.clickhook_api.url}/instances/${instance_id}`, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        instance: {
          deal_value,
          stage_id,
          workflow_id,
          lost_reason,
          assigned_to_id,
        },
      })
    })
      .then(response => response.json())
      .then(responseJson => {
        console.log('#g43gqgfxhg responseJson:', responseJson);
        resolve();
      })
      .catch(error => {
        console.error('#awgwe67jgeaw error: ', error);
        reject(error);
      });

  });
}

export function clickhook_get_lead_tasks(token: string, lead_id: string) {
  return new Promise((resolve, reject) => {
    fetch(`${config.clickhook_api.url}/tasks?lead_id=${lead_id}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    })
      .then(response => response.json())
      .then(responseJson => {
        console.log('#sdf41sd clickhook_get_lead_tasks responseJson: ', responseJson);
        if (responseJson.tasks) {
          resolve(responseJson.tasks);
        } else if (responseJson.errors && responseJson.errors.length > 0) {
          resolve({error_message: responseJson.errors[0].toString().trim()});
        } else {
          reject(responseJson);
        }
      })
      .catch(error => {
        console.error('#eg5gggr error: ', error);
        reject(error);
      });
  });
}

export function clickhook_update_task(token: string, name: string, completed: bool, task_id: string) {
  return new Promise((resolve, reject) => {

    let task = {};
    if (name !== null) {
      task.name = name;
    }
    if (completed !== null) {
      task.completed = completed;
    }

    fetch(`${config.clickhook_api.url}/tasks/${task_id}`, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        task,
      })
    })
      .then(response => response.json())
      .then(responseJson => {
        console.log('#24g4353g responseJson:', responseJson);
        resolve();
      })
      .catch(error => {
        console.error('#35g53353 error: ', error);
        reject(error);
      });

  });
}

export function clickhook_create_task(token: string,
                                      name: string,
                                      description: string,
                                      lead_id: number,
                                      assigned_by_id: string,
                                      assigned_to_id: string,
                                      label: string,
                                      due: date,
                                      is_reminder: bool) {
  return new Promise((resolve, reject) => {

    let task = {
      name,
      description,
      lead_id,
      assigned_by_id,
      assigned_to_id,
      label,
      due,
      is_reminder,
      completed: false,
    };
    console.log('#s1sd1as saving task: ', task);

    fetch(`${config.clickhook_api.url}/tasks`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        task
      })
    })
      .then(response => response.json())
      .then(responseJson => {
        console.log('#wefe433gg55g responseJson:', responseJson);
        resolve();
      })
      .catch(error => {
        console.error('#43gw4g error: ', error);
        reject(error);
      });

  });
}


export function clickhook_get_lead_notes(token: string, lead_id: string) {
  return new Promise((resolve, reject) => {
    fetch(`${config.clickhook_api.url}/notes?lead_id=${lead_id}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    })
      .then(response => response.json())
      .then(responseJson => {

        if (responseJson.attachments || responseJson.notes) {
          resolve(responseJson);
        } else if (responseJson.errors.length > 0) {
          resolve({error_message: responseJson.errors[0].toString().trim()});
        } else {
          reject(responseJson);
        }
      })
      .catch(error => {
        console.error('#d54235423e error: ', error);
        reject(error);
      });
  });
}

export function clickhook_update_note(token: string, text: string, note_id: string) {
  return new Promise((resolve, reject) => {
    console.log('#d1f14sdf trying to clickhook_update_note ', text, note_id);

    fetch(`${config.clickhook_api.url}/notes/${note_id}`, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        note: {
          text,
        },
      })
    })
      .then(response => response.json())
      .then(responseJson => {
        console.log('#wrgerg responseJson:', responseJson);
        resolve();
      })
      .catch(error => {
        console.error('#wegewg error: ', error);
        reject(error);
      });

  });
}
export function clickhook_create_note(token: string, text: string, lead_id: string) {
  return new Promise((resolve, reject) => {

    fetch(`${config.clickhook_api.url}/notes`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        note: {
          text,
          lead_id,
        },
      })
    })
      .then(response => response.json())
      .then(responseJson => {
        console.log('#wefe433gg55g responseJson:', responseJson);
        resolve();
      })
      .catch(error => {
        console.error('#43gw4g error: ', error);
        reject(error);
      });

  });
}

export function clickhook_get_stages(token: string, ids: array) {
  return new Promise((resolve, reject) => {

    fetch(`${config.clickhook_api.url}/stages?ids[]=${ids.join('&ids[]=')}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    })
      .then(response => response.json())
      .then(responseJson => {

        let stages = {};
        if (responseJson.stages && responseJson.stages.length > 0) {
          responseJson.stages.forEach(stage => {
            stages[stage.id] = stage;
          });
        }

        resolve(stages);

      })
      .catch(error => {
        console.error('#234g4 error: ', error);
        reject(error);
      });

  });
}
