import React, { FC } from 'react';
import emailjs from 'emailjs-com';
import { useForm } from 'react-hook-form';
import { Section } from '../../components/Section';
import { NavigationTemplate } from '../../components/NavigationTemplate';
import './Contact.scss';

export const Contact: FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data: any): void => {
    emailjs
      .send(
        `${process.env.REACT_APP_EMAIL_SERVICE_ID}`,
        `${process.env.REACT_APP_EMAIL_TRMPLATE_ID}`,
        data,
        'user_RnnFaOANi8yXd30WR'
      )
      .then((response) => {
        console.log('SUCCESS!', response.status, response.text);
        reset();
      })
      .catch((err) => {
        console.log('FAILED...', err);
      });
  };

  return (
    <NavigationTemplate>
      <Section>
        <div className="contact">
          <form onSubmit={handleSubmit(onSubmit)} className="contact__form">
            <div className="contact__form-row">
              <div className="contact__form-col">
                <div className="contact__form-col-item">
                  <input type="text" placeholder="Name..." {...register('name', { required: 'Name is required' })} />
                  {errors.name && <span className="contact__form-error">{errors.name.message as any}</span>}
                </div>
                <div className="contact__form-col-item">
                  <input
                    type="text"
                    placeholder="Job Title..."
                    {...register('jobTitle', { required: 'Job title is required' })}
                  />
                  {errors.jobTitle && <span className="contact__form-error">{errors.jobTitle.message as any}</span>}
                </div>
              </div>
              <div className="contact__form-col">
                <div className="contact__form-col-item">
                  <input
                    type="email"
                    placeholder="Email..."
                    {...register('email', {
                      required: 'Email is required',
                      pattern: {
                        value: /\S+@\S+\.\S+/,
                        message: 'Email is invalid',
                      },
                    })}
                  />
                  {errors.email && <span className="contact__form-error">{errors.email.message as any}</span>}
                </div>
                <div className="contact__form-col-item">
                  <input
                    type="text"
                    placeholder="Company..."
                    {...register('company', { required: 'Company is required' })}
                  />
                  {errors.company && <span className="contact__form-error">{errors.company.message as any}</span>}
                </div>
              </div>
            </div>
            <div className="contact__form-col">
              <div className="contact__form-col-item">
                <textarea
                  placeholder="Requirements..."
                  {...register('requirements', { required: 'Requirements are required' })}
                />
                {errors.requirements && (
                  <span className="contact__form-error">{errors.requirements.message as any}</span>
                )}
              </div>
            </div>
            <button type="submit">Submit</button>
          </form>
        </div>
      </Section>
    </NavigationTemplate>
  );
};
