import { Schema, model, models } from 'mongoose';

const homeContentsSchema = new Schema({
  heading: { type: String, required: false },
  subHeading: { type: String, required: false },
  description: { type: String, required: false },
  imageUrl: { type: String, required: false },
  name: { type: String, required: false },
  role: { type: String, required: false },
  email: { type: String, required: false },
  links: { type: Map, of: String, default: {} },
  skills: { type: [String], required: false, default: [] },

  topProjects: {
    type: [
      {
        title: { type: String, required: false },
        heading: { type: String, required: false, default: "" },
        features: { type: [String], required: false, default: [] },
        liveLink: { type: String, required: false },
        githubLink: { type: String, required: false },
        description: { type: String, required: false },
        skills: { type: [String], required: false, default: [] },
        image: { type: [String], required: false, default: [] },
      }
    ],
    default: [],
  },

  topBlogs: {
    type: [
      {
        title: { type: String, required: false },
        link: { type: String, required: false },
        summary: { type: String, required: false },
        image: { type: [String], required: false, default: [] },
        date: { type: Date, required: false },
        tags: { type: [String], required: false, default: [] },
      }
    ],
    default: [],
  },
}, { timestamps: true });

export default models.HomeContent || model('HomeContent', homeContentsSchema);