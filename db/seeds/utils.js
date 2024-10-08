const { topicData } = require("../data/test-data");


exports.convertTimestampToDate = ({ created_at, ...otherProperties }) => {
  if (!created_at) return { ...otherProperties };
  return { created_at: new Date(created_at), ...otherProperties };
};

exports.createRef = (arr, key, value) => {
  return arr.reduce((ref, element) => {
    ref[element[key]] = element[value];
    return ref;
  }, {});
};

exports.formatComments = (comments, idLookup) => {
  return comments.map(({ created_by, belongs_to, ...restOfComment }) => {
    const article_id = idLookup[belongs_to];
    return {
      article_id,
      author: created_by,
      ...this.convertTimestampToDate(restOfComment),
    };
  });
};

exports.checkArticleIdExists = (article_id) => {
  return db.query(`SELECT * FROM articles WHERE article_id = $1;`, [article_id]).then((response) => {
    if(response.rows.length === 0){
      return Promise.reject({ status: 404, msg: "Article Not Found"})
    }
  })
}

exports.checkUsernameIsValid = (usernamesObj, username) => {

    for (let i = 0; i < usernamesObj.length; i++) {
   
        if (usernamesObj[i].hasOwnProperty('username') && usernamesObj[i].username === username) {
            return true;
        }
    }

    return false;

}

exports.checkTopicIsValid = (topicData, topic) => {

  for (let i = 0; i < topicData.length; i++) {
 
      if (topicData[i].hasOwnProperty('topic') && topicData[i].topic === topic) {
        
          return true;
      }
  }

  return false;

}












