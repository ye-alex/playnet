import React, { FC, useEffect } from 'react';
import emailjs from '@emailjs/browser';
import { useForm } from 'react-hook-form';
import { NavigationTemplate } from '../../components/NavigationTemplate';
import { Section } from '../../components/Section';
import { useSnackbar } from '../../hooks/snackbar';
import { joinStrings } from '../../utils/string';
import './Contact.scss';

interface FormFields {
  jobTitle: string;
  email: string;
  name: string;
  company: string;
  requirements: string;
}

export const Contact: FC = () => {
  const { addSnack } = useSnackbar();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormFields>();

  const onSubmit = (data: FormFields): void => {
    emailjs
      .send(
        `${process.env.REACT_APP_EMAIL_SERVICE_ID}`,
        `${process.env.REACT_APP_EMAIL_TRMPLATE_ID}`,
        data as unknown as Record<string, unknown>
      )
      .then((response) => {
        console.log('SUCCESS!', response.status, response.text);
        addSnack({
          type: 'success',
          message: 'Your details were sent successfully',
        });
        reset();
      })
      .catch((err) => {
        console.log('FAILED...', err);
        addSnack({
          type: 'error',
          message: 'Something went wrong! Please try again',
        });
      });
  };

  useEffect(() => {
    emailjs.init({
      publicKey: `${process.env.REACT_APP_EMAIL_PUBLIC_KEY}`,
      // Do not allow headless browsers
      blockHeadless: true,
      limitRate: {
        // Set the limit rate for the application
        id: 'app',
        // Allow 1 request per 10s
        throttle: 10000,
      },
    });
  }, []);

  return (
    <NavigationTemplate className="contact" title="CONTACT" description="GET IN TOUCH">
      <Section className="contact__content">
        <p>
          Looking to create an amazing game in a quick manner? From captivating casual games to groundbreaking metaverse
          projects, our extensive range of services covers all your gaming development needs. Explore how our innovative
          solutions can bring your ideas to life with creativity, precision, and technical excellence.
        </p>
      </Section>
      <Section className="contact__form-wrapper">
        <p className="contact__title">Fill in the below form and we'll get back to you ASAP.</p>
        <form onSubmit={handleSubmit(onSubmit)} className="contact__form">
          <div className="contact__form-row">
            <div className="contact__form-col">
              <div className="contact__form-col-item">
                <input type="text" placeholder="Name..." {...register('name', { required: 'Name is required' })} />
                {errors.name && <span className="contact__form-error">{errors.name.message}</span>}
              </div>
              <div className="contact__form-col-item">
                <input
                  type="text"
                  placeholder="Job Title..."
                  {...register('jobTitle', { required: 'Job title is required' })}
                />
                {errors.jobTitle && <span className="contact__form-error">{errors.jobTitle.message}</span>}
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
                {errors.email && <span className="contact__form-error">{errors.email.message}</span>}
              </div>
              <div className="contact__form-col-item">
                <input
                  type="text"
                  placeholder="Company..."
                  {...register('company', { required: 'Company is required' })}
                />
                {errors.company && <span className="contact__form-error">{errors.company.message}</span>}
              </div>
            </div>
          </div>
          <div className={joinStrings(['contact__form-col', 'contact__form-col--full'])}>
            <div className="contact__form-col-item">
              <textarea
                rows={12}
                placeholder="Requirements..."
                {...register('requirements', { required: 'Requirements are required' })}
              />
              {errors.requirements && <span className="contact__form-error">{errors.requirements.message}</span>}
            </div>
          </div>
          <button type="submit">Submit</button>
        </form>
      </Section>
    </NavigationTemplate>
  );
};
