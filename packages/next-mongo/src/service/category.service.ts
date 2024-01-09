import CategoryModel from '../models/category.model'
import JobModel from '../models/job.model'
import _ from 'lodash'
import cloudinary from '../utils/cloudinary'

// create a category service
export async function createCategoryService(categoryData: any, imagePath: any) {
  try {
    let categoryInput
    if (imagePath) {
      // Upload image to cloudinary
      const imageData = await cloudinary.uploader.upload(imagePath)
      categoryInput = {
        ...categoryData,
        avatar: imageData.secure_url,
        iconUrl: imageData.public_id,
      }
    } else {
      categoryInput = {
        ...categoryData,
      }
    }
    // console.log('CategoryInput from servoce', categoryInput)
    const category = await CategoryModel.create(categoryInput)

    return category
  } catch (e: any) {
    //console.log(e)
    throw e.code
  }
}

export async function getCategories() {
  try {
    const categories = await CategoryModel.find().lean(true)

    // get the list of categoryTitle
    const categoryTitle = _.map(categories, 'categoryTitle')
    //   count the aggregate category
    const count = await JobModel.aggregate([
      {
        $group: {
          _id: '$category',
          count: { $sum: 1 },
        },
      },
    ])

    const result = categories.map((category: any) => {
      const categoryCount = count.find(
        (count: any) => count._id === category.categoryTitle
      )

      return {
        ...category,
        count: categoryCount ? categoryCount.count : 0,
      }
    })
    return result
  } catch (e) {
    throw e
  }
}

// delete a category service
export async function deleteCategoryService(categoryID: string) {
  try {
    // Delete image from cloudinary
    const categoryPrevData = (await CategoryModel.findById(categoryID)) as any
    if (categoryPrevData.iconUrl) {
      await cloudinary.uploader.destroy(categoryPrevData.iconUrl)
    }

    const category = await CategoryModel.findByIdAndDelete(categoryID)
    return category
  } catch (e) {
    throw e
  }
}

// get a category service
export async function getSingleCategoryService(categoryID: string) {
  try {
    const category = await CategoryModel.findById(categoryID).lean(true)

    const jobCount = _.pick(category, ['categoryTitle'])

    const totalJob = await JobModel.find({
      category: jobCount.categoryTitle,
    }).count()

    const result = {
      ...category,
      count: totalJob,
    }

    return _.omit(result, ['__v', 'createdAt', 'updatedAt'])
  } catch (e) {
    throw e
  }
}

// update a category service
export async function updateCategoryService(
  categoryID: string,
  categoryData: any,
  imagePath: any
) {
  try {
    let categoryInput
    if (imagePath) {
      // Upload image to cloudinary
      const imageData = await cloudinary.uploader.upload(imagePath)
      categoryInput = {
        ...categoryData,
        avatar: imageData.secure_url,
        iconUrl: imageData.public_id,
      }
    } else {
      categoryInput = {
        ...categoryData,
      }
    }

    const category = await CategoryModel.findByIdAndUpdate(
      categoryID,
      categoryInput,
      {
        new: true,
      }
    )

    return category
  } catch (e) {
    throw e
  }
}
