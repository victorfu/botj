const express = require('express');
const multer = require('multer');
const { validateBody } = require('../../utils/ajv');
const { ValidateProps } = require('../../utils/constants');
const { uploadFile } = require('../../storage/gcs');

const router = express.Router();
const upload = multer({ dest: '/tmp' });

/**
 * A Document
 * @typedef {object} Document
 * @property {string} file - document attachment - binary
 * @property {string} note - document description
 */

/**
 * POST /api/documents
 * @tags document
 * @summary upload a file document
 * @param {Document} request.body.required - document info - multipart/form-data
 * @return {object} 200 - success response - application/json
 */
router.post(
  '/documents',
  upload.single('file'),
  validateBody({
    type: 'object',
    properties: {
      note: ValidateProps.doc.note,
    },
    required: ['note'],
    additionalProperties: true,
  }),
  async (req, res) => {
    // req.file is the name of your file in the form, here 'file'
    // req.body will hold the text fields, if there were any
    if (!req.file) {
      return res.status(400).end();
    }
    const url = await uploadFile(req.file);
    res.json({ url });
  },
);

module.exports = router;
